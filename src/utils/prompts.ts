import chalk from "chalk";
import pkg from "enquirer";
const { Input } = pkg as any;
import figures from "figures";
import { CLAUDE_COLOR } from "../constants/colors.js";

export async function getNextPrompt(): Promise<string> {
    const prompt = new Input({
        message: ``,
        initial: '',
        prefix: chalk.hex(CLAUDE_COLOR).bold('minicc') + chalk.gray(' >'),
    });

    const result = await prompt.run();
    return result || '';
}
