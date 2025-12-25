import chalk from "chalk";
import pkg from "enquirer";
const { Input } = pkg as any;
import figures from "figures";
import { CLAUDE_COLOR } from "../constants/colors.js";

export async function getNextPrompt(): Promise<string> {
    const prompt = new Input({
        message: chalk.hex(CLAUDE_COLOR)(`${figures.pointer} `),
        name: "query",
    });

    return await prompt.run();
}
