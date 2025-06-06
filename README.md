# TGCopilot (Skeleton)

This repository provides a minimal Node.js/TypeScript scaffold for a future Telegram bot that can run entirely offline using a local LLM engine such as Ollama.

## Features

- Express server with health check endpoint `/`
- Startup check for a local LLM API (default `http://localhost:11434/v1/models`)
- Vitest setup for running unit tests

## Getting Started

Install dependencies:

```bash
npm install
```

Run unit tests:

```bash
npm test
```

Build the project:

```bash
npm run build
```

Start the development server:

```bash
node dist/index.js
```

The server prints a warning if the local LLM endpoint is unavailable.
