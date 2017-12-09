import {
  init,
  close
} from '../';
import {
  readUsuarios,
  createUsuario,
  readUsuario,
  readUsuarioPorUsuario,
  updateUsuario,
  deleteUsuario,
} from '../usuarios';

const NUEVO_USUARIO = {
  usuario: 'pepe',
  password: '123456789',
  nombre: 'José Pérez',
};

describe('dbOps.usuarios', () => {
  beforeAll(init);
  afterAll(close);
  it('They should all be functions', () => {
    expect(typeof readUsuarios).toBe('function');
    expect(typeof createUsuario).toBe('function');
    expect(typeof readUsuario).toBe('function');
    expect(typeof readUsuarioPorUsuario).toBe('function');
    expect(typeof updateUsuario).toBe('function');
    expect(typeof deleteUsuario).toBe('function');
  });
  describe('readUsuarios', () => {
    it('should return a list', async () => {
      const query = readUsuarios();
      expect(query).toBeInstanceOf(Promise);
      const rows = await query;
      expect(Array.isArray(rows)).toBeTruthy();
      rows.forEach(row => {
        expect(row).toEqual(expect.objectContaining({
          idUsuario: expect.any(Number),
          password: expect.any(String),
          usuario: expect.any(String),
          nivel: expect.any(Number),
          rolGuarda: expect.any(Boolean),
          rolDios: expect.any(Boolean),
          rolSupervisor: expect.any(Boolean),
          rolMecanico: expect.any(Boolean),
          funcion: expect.any(Number),
          nombre: expect.any(String),
        }));
        expect(row.password.length).toBeGreaterThan(0);
        expect(row.usuario.length).toBeGreaterThan(0);
        expect(row.nombre.length).toBeGreaterThan(0);
      })
    })
  })
  describe('Con nuevo usuario', () => {
    let idUsuario;
    beforeAll(async () => {
      const query = createUsuario(NUEVO_USUARIO);
      expect(query).toBeInstanceOf(Promise);
      const result = await query;
      expect(typeof result).toBe('object');
      expect(result.success).toBeTruthy();
      expect(typeof result.idUsuario).toBe('number');
      idUsuario = result.idUsuario;
    })
    afterAll(async () => {
      const query = deleteUsuario(idUsuario);
      expect(query).toBeInstanceOf(Promise);
      const result = await query;
      expect(result).toEqual({
        success: true
      });
    })
    describe('readUsuario', () => {
      it('by id:should return the one asked for', async () => {
        const query = readUsuario(idUsuario);
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row.idUsuario).toBe(idUsuario);
        expect(row.nombre).toBe(NUEVO_USUARIO.nombre);
        expect(row.usuario).toBe(NUEVO_USUARIO.usuario);
        expect(row.password).toBe(NUEVO_USUARIO.password);
        expect(row.nivel).toBe(0);
        expect(row.funcion).toBe(0);
        expect(row.rolGuarda).toBeFalsy();
        expect(row.rolDios).toBeFalsy();
        expect(row.rolSupervisor).toBeFalsy();
        expect(row.rolMecanico).toBeFalsy();
      })
      it('by usuario: should return the one asked for', async () => {
        const query = readUsuarioPorUsuario(NUEVO_USUARIO.usuario);
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row.idUsuario).toBe(idUsuario);
        expect(row.nombre).toBe(NUEVO_USUARIO.nombre);
        expect(row.usuario).toBe(NUEVO_USUARIO.usuario);
        expect(row.password).toBe(NUEVO_USUARIO.password);
      })
      it('should fail on non-existing', async () => {
        const query = readUsuario(0);
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row).toBeUndefined();
      })
    })
    describe('updateUsuario', () => {
      it('change 1 record', async () => {
        const query = updateUsuario(idUsuario, {
          rolDios: true
        });
        expect(query).toBeInstanceOf(Promise);
        const result = await query;
        expect(result).toEqual({
          success: true
        });
        const row = await readUsuario(idUsuario);
        expect(row.rolDios).toBeTruthy();
      })
      it('should fail on non-existing record', async () => {
        const query = updateUsuario(0, {
          rolDios: true
        });
        expect(query).toBeInstanceOf(Promise);
        const result = await query;
        expect(result).toEqual({
          success: false
        });

      })
    })
    describe('createUsuario', () => {
      it('should fail on duplicate', async () => {
        const query = createUsuario(NUEVO_USUARIO);
        expect(query).toBeInstanceOf(Promise);
        const result = await query;
        expect(typeof result).toBe('object');
        expect(result.success).toBeFalsy();
      })
    })
  })
});
