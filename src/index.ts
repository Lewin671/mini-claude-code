import { type SDKUserMessage } from "@anthropic-ai/claude-agent-sdk";
import "dotenv/config";
import chalk from "chalk";
import { setupRenderer, renderMarkdown } from "./utils/renderer.js";
import { getNextPrompt } from "./utils/prompts.js";
import { spinner, logHeader, logToolUse, logToolResult, logSuccess, logError } from "./utils/logger.js";
import { createAgentStream } from "./core/agent.js";
import logSymbols from "log-symbols";

async function main() {
    setupRenderer();
    logHeader();

    let resolveNextInput: ((msg: SDKUserMessage) => void) | null = null;

    const inputGenerator = async function* () {
        while (true) {
            const input = await new Promise<SDKUserMessage>((resolve) => {
                resolveNextInput = resolve;
            });
            yield input;
        }
    };

    const stream = createAgentStream(inputGenerator());

    const handleInput = async (sessionId: string = "") => {
        const prompt = await getNextPrompt();
        if (prompt.trim() === '/exit') process.exit(0);

        if (resolveNextInput) {
            (resolveNextInput as any)({
                type: "user",
                message: { role: "user", content: prompt },
                session_id: sessionId,
                parent_tool_use_id: null,
            });
        }
    };

    // Initial Trigger
    await handleInput();

    try {
        for await (const message of stream) {
            switch (message.type) {
                case "assistant":
                    if (spinner.isSpinning) spinner.stop();
                    if (message.message.content) {
                        for (const content of message.message.content) {
                            if (content.type === "text") {
                                console.log("\n" + renderMarkdown(content.text));
                            } else if (content.type === "tool_use") {
                                logToolUse(content.name, content.input);
                            }
                        }
                    }
                    break;

                case "user":
                    if (message.tool_use_result) {
                        logToolResult(message.tool_use_result);
                    }
                    break;

                case "tool_progress":
                    if (!spinner.isSpinning) {
                        spinner.start(chalk.gray(`Claude is working...`));
                    }
                    spinner.text = chalk.gray(`Claude is using ${chalk.bold(message.tool_name)}...`);
                    break;

                case "result":
                    if (spinner.isSpinning) spinner.stop();
                    console.log();
                    if (message.subtype === "success") {
                        logSuccess("Task completed successfully.");
                    } else {
                        logError(`Task ended with status: ${message.subtype}`);
                    }

                    await handleInput(message.session_id);
                    break;

                case "system":
                    if (message.subtype === "status" && message.status === "compacting") {
                        spinner.start(chalk.gray("Compacting conversation context..."));
                    }
                    break;
            }
        }
    } catch (error: any) {
        if (spinner.isSpinning) spinner.stop();
        logError(`Error: ${error.message}`);
        process.exit(1);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
