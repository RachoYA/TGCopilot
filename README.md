# TGCopilot (Prototype)

This repository provides a small Node.js/TypeScript prototype for an offline Telegram assistant. It relies on a locally running LLM (Ollama or compatible) and demonstrates basic Telegram connectivity and authentication middleware.

## Features

- Express server with health check endpoint `/`
- Startup check for a local LLM API (default `http://localhost:11434/v1/models`)
- Session based login (`/login`) with bcrypt password hash
- Telegram client initialization via GramJS
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

Create a `.env` file with at least the following variables:

```
ADMIN_HASH=<bcrypt password hash>
SESSION_SECRET=change-me
API_ID=<telegram api id>
API_HASH=<telegram api hash>
TG_SESSION=<optional saved session>
```

The server prints a warning if the local LLM endpoint is unavailable.
