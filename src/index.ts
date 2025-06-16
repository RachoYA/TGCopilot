import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { checkLLMEndpoint } from './llm';
import { setupAuth, requireAuth } from './auth';
import { initTelegram } from './telegram';

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3000;
setupAuth(app);

app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/protected', requireAuth, (_req: Request, res: Response) => {
  res.json({ secret: '42' });
});

export async function start() {
  const llmOk = await checkLLMEndpoint();
  if (!llmOk) {
    console.log('LLM endpoint unavailable. Install Ollama and run "ollama run llama3"');
  }
  await initTelegram();
  app.listen(Number(PORT), () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  start();
}
