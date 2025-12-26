import { query, type SDKUserMessage } from "@anthropic-ai/claude-agent-sdk";

export interface AgentOptions {
    allowedTools: string[];
}

export function createAgentStream(inputGenerator: AsyncGenerator<SDKUserMessage>) {
    const model = process.env.ANTHROPIC_MODEL?.trim();

    return query({
        prompt: inputGenerator,
        options: {
            allowedTools: ["Read", "Edit", "Bash", "LS", "Grep", "Glob", "Task"],
            extraArgs: model ? { model } : undefined,
        },
    });
}
