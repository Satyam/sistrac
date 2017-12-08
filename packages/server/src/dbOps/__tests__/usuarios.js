import {
  init,
  close
} from '../';
import {
  createUsuario,
  readUsuario,
  updateUsuario,
  deleteUsuario,
} from '../usuarios';

describe('dbOps.usuarios', () => {
  beforeAll(init);
  afterAll(close);
  it ('They should all be functions', () => {
    expect(typeof createUsuario).toBe('function');
    expect(typeof readUsuario).toBe('function');
    expect(typeof updateUsuario).toBe('function');
    expect(typeof deleteUsuario).toBe('function');
  });
});
