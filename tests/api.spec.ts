import { test, expect, request } from '@playwright/test';

const apiBase = process.env.API_URL || 'https://reqres.in/api';

test('GET users returns 200', async () => {
  const ctx = await request.newContext({ baseURL: apiBase });
  const res = await ctx.get('/users?page=2');
  expect(res.status()).toBe(200);
  const json = await res.json();
  expect(Array.isArray(json.data)).toBeTruthy();
});

test('POST creates a user', async () => {
  const ctx = await request.newContext({ baseURL: apiBase });
  const res = await ctx.post('/users', { data: { name: 'morpheus', job: 'leader' } });
  expect(res.ok()).toBeTruthy();
  const json = await res.json();
  expect(json).toHaveProperty('id');
});
