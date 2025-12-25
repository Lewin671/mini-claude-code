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

## Configuration

The application requires an Anthropic API key to function. You can provide this in two ways:

### 1. Using a `.env` file
Create a `.env` file in the project root:
```env
ANTHROPIC_API_KEY=your_api_key_here
ANTHROPIC_BASE_URL=https://api.anthropic.com  # Optional
```

### 2. Using Shell Environment Variables
You can also set the variables directly in your terminal:
```bash
export ANTHROPIC_API_KEY=your_api_key_here
export ANTHROPIC_BASE_URL=https://api.anthropic.com
```

> **Note on Priority:** Shell environment variables take precedence over settings in the `.env` file. This allows you to easily override your configuration for specific sessions.


3. **Run the app:**
   ```bash
   npm run dev
   ```

## License

ISC
