import chalk from "chalk";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";
import { CLAUDE_COLOR } from "../constants/colors.js";

export function setupRenderer() {
    marked.setOptions({
        renderer: new TerminalRenderer({
            codespan: chalk.yellow,
            blockquote: chalk.gray.italic,
            firstHeading: chalk.hex(CLAUDE_COLOR).bold,
            strong: chalk.bold,
            em: chalk.italic,
        }) as any,
    });
}

export function renderMarkdown(text: string): string {
    return (marked.parse(text) as string).trim();
}
