import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { checkLLMEndpoint } from './llm';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

async function start() {
  const llmOk = await checkLLMEndpoint();
  if (!llmOk) {
    console.log('LLM endpoint unavailable. Install Ollama and run "ollama run llama3"');
  }
  app.listen(Number(PORT), () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start();
