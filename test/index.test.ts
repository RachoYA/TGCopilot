import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app, start } from '../src/index';
import { createServer } from 'http';

let server: any;

beforeAll(async () => {
  process.env.ADMIN_USER = 'admin';
  process.env.ADMIN_HASH = '$2a$10$XjFAoB4atAaSEZAkLF9M..s1gfZMQO2pDQ5UYmspRUPVTwEzKmelm';
  process.env.SESSION_SECRET = 'test';
  process.env.NODE_ENV = 'test';
  server = createServer(app);
});

describe('auth flow', () => {
  it('rejects invalid login', async () => {
    const res = await request(server).post('/login').send({ username: 'admin', password: 'bad' });
    expect(res.status).toBe(401);
  });

  it('allows login and access to protected route', async () => {
    const agent = request.agent(server);
    const login = await agent.post('/login').send({ username: 'admin', password: 'testpass' });
    expect(login.status).toBe(200);
    const res = await agent.get('/protected');
    expect(res.status).toBe(200);
    expect(res.body.secret).toBe('42');
  });
});

import { checkLLMEndpoint } from "../src/llm";

describe("checkLLMEndpoint", () => {
  it("returns boolean", async () => {
    const ok = await checkLLMEndpoint();
    expect(typeof ok).toBe("boolean");
  });
});

