export async function checkLLMEndpoint(): Promise<boolean> {
  const url = process.env.LLM_URL || 'http://localhost:11434/v1/models';
  try {
    const res = await fetch(url, { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
}
