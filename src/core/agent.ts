import { query, type SDKUserMessage } from "@anthropic-ai/claude-agent-sdk";

export interface AgentOptions {
    allowedTools: string[];
}

export function createAgentStream(inputGenerator: AsyncGenerator<SDKUserMessage>) {
    return query({
        prompt: inputGenerator,
        options: {
            allowedTools: ["Read", "Edit", "Bash", "LS", "Grep", "Glob", "Task"],
        },
    });
}
