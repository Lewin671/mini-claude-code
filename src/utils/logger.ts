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
    console.log(chalk.hex(CLAUDE_COLOR).bold(`\n ${figures.star} Mini Claude Code\n`));
    console.log(chalk.gray(` Type '/exit' to quit • Working directory: ${process.cwd()}\n`));
}

export function logToolUse(name: string, input?: any) {
    let detail = "";
    if (input) {
        if (name === "Bash" && input.command) {
            detail = chalk.cyan(`$ ${input.command}`);
        } else if (name === "Read" && input.path) {
            detail = chalk.cyan(input.path);
        } else if (name === "LS" && input.path) {
            detail = chalk.cyan(input.path);
        } else if (name === "Edit" && input.path) {
            detail = chalk.cyan(input.path);
        } else if (name === "Grep" && input.query) {
            detail = chalk.cyan(`"${input.query}" in ${input.path || '.'}`);
        } else if (name === "Task" && input.task) {
            detail = chalk.cyan(input.task);
        } else {
            detail = chalk.gray(JSON.stringify(input));
        }
    }

    console.log(chalk.hex(TOOL_COLOR)(` ${figures.play} Tool: `) + chalk.bold(name) + (detail ? ` ${detail}` : ""));
}

export function logToolResult(result: any) {
    if (result && typeof result === 'object') {
        if (result.stdout !== undefined) {
            const out = result.stdout.trim();
            const err = result.stderr ? result.stderr.trim() : "";
            if (out) {
                const lines = out.split('\n');
                const preview = lines[0] + (lines.length > 1 ? " ..." : "");
                console.log(chalk.green(` ${figures.tick} `) + chalk.gray(preview));
            } else if (err) {
                console.log(chalk.red(` ${figures.warning} `) + chalk.gray(err.split('\n')[0]));
            } else {
                console.log(chalk.green(` ${figures.tick} Done (no output)`));
            }
            return;
        }
    }
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
