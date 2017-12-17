import { start, stop } from '../server';
import { REST_HOST, REST_PORT, REST_API_PATH } from '../../config';

const fetch = require('node-fetch');

describe('server integration test', () => {
  beforeAll(() => start());
  afterAll(stop);
  it('echo', async () => {
    const resp = await fetch(`${REST_HOST}:${REST_PORT}/echo`);
    expect(resp.ok).toBeTruthy();
    expect(resp.status).toBe(200);
    const req = await resp.json();
    expect(req.method).toBe('GET');
    expect(req.path).toBe('/');
  });
  it('login', async () => {
    const resp = await fetch(`${REST_HOST}:${REST_PORT}${REST_API_PATH}/usuarios/login`, {
      method: 'PUT',
      body: JSON.stringify({
        usuario: 'satyam',
        password: 'uma123',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(resp.status, await resp.text());
  });
});
