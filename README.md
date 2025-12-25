# Mini Claude Code

A beautifully crafted Terminal User Interface for interacting with the Anthropic Claude Agent SDK, inspired by Claude Code.

## Features

- 🚀 **Fast & Efficient**: Built with TypeScript and `tsx`.
- 🎨 **Rich Aesthetics**: Uses `chalk`, `ora`, and `marked-terminal` for a premium terminal experience.
- 🛠️ **Tool Support**: Integrated support for Anthropic Agent SDK tools (Bash, Edit, Read, etc.).
- 📦 **Modern Structure**: Modular code design following industry standards.

## Project Structure

```bash
.
├── src/
│   ├── constants/       # Global constants (colors, config)
│   ├── core/            # Core logic (SDK interaction)
│   ├── utils/           # Utility functions (logger, renderer, prompts)
│   └── index.ts         # Application entry point
├── .env                 # Environment variables
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project metadata and dependencies
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Create a `.env` file with your Anthropic API Key:
   ```env
   ANTHROPIC_API_KEY=your_key_here
   ```

3. **Run the app:**
   ```bash
   npm run dev
   ```

## License

ISC
