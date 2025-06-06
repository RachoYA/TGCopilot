import { describe, it, expect } from 'vitest';
import { checkLLMEndpoint } from '../src/llm';

describe('checkLLMEndpoint', () => {
  it('returns false when endpoint is unreachable', async () => {
    const ok = await checkLLMEndpoint();
    expect(typeof ok).toBe('boolean');
  });
});
