import { start, stop } from '../server';

const fetch = require('node-fetch');

describe('server integration test', () => {
  beforeAll(() => start());
  afterAll(stop);

  it('echo', async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_REST_HOST}:${
        process.env.REACT_APP_REST_PORT
      }/echo`,
    );
    expect(resp.ok).toBeTruthy();
    expect(resp.status).toBe(200);
    const req = await resp.json();
    expect(req.method).toBe('GET');
    expect(req.path).toBe('/');
  });

  it('login', async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_REST_HOST}:${process.env.REACT_APP_REST_PORT}${
        process.env.REACT_APP_REST_PATH
      }/usuarios/login`,
      {
        method: 'PUT',
        body: JSON.stringify({
          usuario: 'satyam',
          password: 'uma123',
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    expect(resp.status).toBe(200);
    const reply = await resp.text();
    const json = JSON.parse(reply);
    expect(json).toEqual({
      idUsuario: 10,
      usuario: 'satyam',
      nivel: 1,
      rolGuarda: true,
      rolDios: true,
      rolSupervisor: true,
      rolMecanico: true,
      funcion: 0,
      nombre: 'Daniel Barreiro',
    });
  });
});
