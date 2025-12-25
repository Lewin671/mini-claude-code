import chalk from "chalk";
import ora from "ora";
import figures from "figures";
import logSymbols from "log-symbols";
import { CLAUDE_COLOR, TOOL_COLOR } from "../constants/colors.js";

export const spinner = ora({
    spinner: 'dots',
    color: 'yellow'
});

export function logHeader() {
    process.stdout.write('\x1Bc'); // Clear terminal
    console.log(chalk.hex(CLAUDE_COLOR).bold(`\n ${figures.star} Claude Agent TUI\n`));
    console.log(chalk.gray(` Type '/exit' to quit • Working directory: ${process.cwd()}\n`));
}

export function logToolUse(name: string, input?: any) {
    console.log(chalk.hex(TOOL_COLOR)(` ${figures.play} Running `) + chalk.bold(name));
    if (input && Object.keys(input).length > 0) {
        console.log(chalk.gray(`   ${JSON.stringify(input)}`));
    }
}

export function logToolResult(result: any) {
    const resultStr = JSON.stringify(result);
    const preview = resultStr.length > 60 ? resultStr.substring(0, 57) + "..." : resultStr;
    console.log(chalk.green(` ${figures.tick} Done `) + chalk.gray(preview));
}

export function logSuccess(message: string) {
    console.log(chalk.green(`${logSymbols.success} ${message}`));
}

export function logError(message: string) {
    console.log(chalk.red(`${logSymbols.error} ${message}`));
}

export function logStatus(message: string) {
    console.log(chalk.gray(message));
}
