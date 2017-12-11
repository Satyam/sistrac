import { init, close } from '../';
import { MysqlError, testMethod } from '../../testUtils';

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
  describe('with mock db', () => {
    const roles = {
      rolDios: false,
      rolGuarda: false,
      rolMecanico: false,
      rolSupervisor: false,
    };
    it(
      'readUsuarios',
      testMethod(
        readUsuarios,
        [NUEVO_USUARIO],
        [{ ...NUEVO_USUARIO, ...roles }],
      ),
    );
    it(
      'createUsuario success',
      testMethod(createUsuario, { insertId: 42 }, 42, NUEVO_USUARIO),
    );
    it(
      'createUsuario fail',
      testMethod(
        createUsuario,
        new MysqlError('ER_DUP_ENTRY'),
        false,
        NUEVO_USUARIO,
      ),
    );
    it(
      'readUsuario success',
      testMethod(
        readUsuario,
        [NUEVO_USUARIO],
        { ...NUEVO_USUARIO, ...roles },
        {
          idUsuario: 42,
        },
      ),
    );
    it(
      'readUsuario fail',
      testMethod(readUsuario, [], false, { idUsuario: 42 }),
    );
    it(
      'readUsuarioPorUsuario success',
      testMethod(
        readUsuarioPorUsuario,
        [NUEVO_USUARIO],
        { ...NUEVO_USUARIO, ...roles },
        {
          usuario: 'pepe',
        },
      ),
    );
    it(
      'readUsuarioPorUsuario fail',
      testMethod(readUsuarioPorUsuario, [], false, { usuario: 'pepe' }),
    );
    it(
      'updateUsuario success',
      testMethod(updateUsuario, { affectedRows: 1 }, true, 42, NUEVO_USUARIO),
    );
    it(
      'updateUsuario fail',
      testMethod(updateUsuario, { affectedRows: 0 }, false, 42, NUEVO_USUARIO),
    );
    it(
      'deleteUsuario success',
      testMethod(deleteUsuario, { affectedRows: 1 }, true, 42),
    );
    it(
      'deleteUsuario fail',
      testMethod(deleteUsuario, { affectedRows: 0 }, false, 42),
    );
  });
  describe('with actual DB', () => {
    beforeAll(() => init());
    afterAll(() => close());
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
          expect(row).toEqual(
            expect.objectContaining({
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
            }),
          );
          expect(row.password.length).toBeGreaterThan(0);
          expect(row.usuario.length).toBeGreaterThan(0);
          expect(row.nombre.length).toBeGreaterThan(0);
        });
      });
    });
    describe('Con nuevo usuario', () => {
      let idUsuario;
      beforeAll(async () => {
        const query = createUsuario(NUEVO_USUARIO);
        expect(query).toBeInstanceOf(Promise);
        const result = await query;
        expect(typeof result).toBe('number');
        idUsuario = result;
      });
      afterAll(async () => {
        const query = deleteUsuario(idUsuario);
        expect(query).toBeInstanceOf(Promise);
        const result = await query;
        expect(result).toBeTruthy();
      });
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
        });
        it('by usuario: should return the one asked for', async () => {
          const query = readUsuarioPorUsuario(NUEVO_USUARIO.usuario);
          expect(query).toBeInstanceOf(Promise);
          const row = await query;
          expect(row.idUsuario).toBe(idUsuario);
          expect(row.nombre).toBe(NUEVO_USUARIO.nombre);
          expect(row.usuario).toBe(NUEVO_USUARIO.usuario);
          expect(row.password).toBe(NUEVO_USUARIO.password);
        });
        it('should fail on non-existing', async () => {
          const query = readUsuario(0);
          expect(query).toBeInstanceOf(Promise);
          const row = await query;
          expect(row).toBeFalsy();
        });
      });
      describe('updateUsuario', () => {
        it('change 1 record', async () => {
          const query = updateUsuario(idUsuario, {
            rolDios: true,
          });
          expect(query).toBeInstanceOf(Promise);
          const result = await query;
          expect(result).toBeTruthy();
          const row = await readUsuario(idUsuario);
          expect(row.rolDios).toBeTruthy();
        });
        it('should fail on non-existing record', async () => {
          const query = updateUsuario(0, {
            rolDios: true,
          });
          expect(query).toBeInstanceOf(Promise);
          const result = await query;
          expect(result).toBeFalsy();
        });
      });
      describe('createUsuario', () => {
        it('should fail on duplicate', async () => {
          const query = createUsuario(NUEVO_USUARIO);
          expect(query).toBeInstanceOf(Promise);
          const result = await query;
          expect(result).toBeFalsy();
        });
      });
    });
  });
});
