import { init, close } from '../';

import { MysqlError, testMethod } from '../../utils/testUtils';

import {
  readEstaciones,
  createEstacion,
  existeEstacionPorNombre,
  existeEstacion,
  updateEstacion,
  readEstacion,
  readEstacionPorNombre,
  deleteEstacion,
} from '../estaciones';

const NOMBRE_ESTACION = 'YYYY';
const ID_ESTACION = 'YYY';

describe('dbOps.estaciones', () => {
  describe('with mock db', () => {
    const retiro = {
      nombre: 'Retiro',
      idEstacion: 'RET',
    };
    it(
      'readEstaciones',
      testMethod(readEstaciones, [{ esto: 'aquello' }], [{ esto: 'aquello' }]),
    );
    it(
      'createEstacion success',
      testMethod(createEstacion, { insertId: 42 }, true, retiro),
    );
    it(
      'createEstacion fail duplicate record',
      testMethod(createEstacion, new MysqlError('ER_DUP_ENTRY'), false, retiro),
    );
    it(
      'existeEstacionPorNombre success',
      testMethod(existeEstacionPorNombre, [{ hay: 1 }], true, 'Retiro'),
    );
    it(
      'existeEstacionPorNombre fail',
      testMethod(existeEstacionPorNombre, [{ hay: 0 }], false, 'Yyyy'),
    );
    it(
      'existeEstacion success',
      testMethod(existeEstacion, [{ hay: 1 }], true, 'RET'),
    );
    it(
      'existeEstacion fail',
      testMethod(existeEstacion, [{ hay: 0 }], false, 'XXX'),
    );
    it(
      'updateEstacion success ',
      testMethod(updateEstacion, { affectedRows: 1 }, true, 'RET', {
        nombre: 'Retiro',
      }),
    );
    it(
      'updateEstacion fail ',
      testMethod(updateEstacion, { affectedRows: 0 }, false, 'XXX', {
        nombre: 'Retiro',
      }),
    );
    it(
      'readEstacion',
      testMethod(readEstacion, [retiro], retiro, { idEstacion: 'RET' }),
    );
    it(
      'readEstacionPorNombre',
      testMethod(readEstacionPorNombre, [retiro], retiro, retiro.nombre),
    );
    it(
      'deleteEstacion success',
      testMethod(deleteEstacion, { affectedRows: 1 }, true, 'RET'),
    );
    it(
      'deleteEstacion fail',
      testMethod(deleteEstacion, { affectedRows: 0 }, false, 'XXX'),
    );
  });
  describe('with actual DB', () => {
    beforeAll(() => init());
    afterAll(() => close());
    it('They should all be functions', () => {
      expect(typeof readEstaciones).toBe('function');
      expect(typeof createEstacion).toBe('function');
      expect(typeof existeEstacionPorNombre).toBe('function');
      expect(typeof existeEstacion).toBe('function');
      expect(typeof updateEstacion).toBe('function');
      expect(typeof readEstacion).toBe('function');
      expect(typeof readEstacionPorNombre).toBe('function');
      expect(typeof deleteEstacion).toBe('function');
    });
    describe('readEstaciones', () => {
      it('should return a list', async () => {
        const query = readEstaciones();
        expect(query).toBeInstanceOf(Promise);
        const rows = await query;
        expect(Array.isArray(rows)).toBeTruthy();
        rows.forEach(row => {
          expect(row).toEqual(
            expect.objectContaining({
              idEstacion: expect.any(String),
              nombre: expect.any(String),
              latitud: expect.any(Number),
              longitud: expect.any(Number),
            }),
          );
          expect(row.idEstacion.length).toBe(3);
          expect(row.nombre.length).toBeGreaterThan(0);
        });
      });
    });
    describe('Con nueva estacion', () => {
      beforeAll(async () => {
        const query = createEstacion({
          nombre: NOMBRE_ESTACION,
          idEstacion: ID_ESTACION,
          latitud: 25,
          longitud: 52,
        });
        expect(query).toBeInstanceOf(Promise);
        const result = await query;
        expect(typeof result).toBe('boolean');
      });
      afterAll(async () => {
        const query = deleteEstacion(ID_ESTACION);
        expect(query).toBeInstanceOf(Promise);
        const result = await query;
        expect(result).toBeTruthy();
      });
      describe('readEstacion', () => {
        it('by id:should return the one asked for', async () => {
          const query = readEstacion(ID_ESTACION);
          expect(query).toBeInstanceOf(Promise);
          const row = await query;
          expect(row.idEstacion).toBe(ID_ESTACION);
          expect(row.nombre).toBe(NOMBRE_ESTACION);
        });
        it('by name: should return the one asked for', async () => {
          const query = readEstacionPorNombre(NOMBRE_ESTACION);
          expect(query).toBeInstanceOf(Promise);
          const row = await query;
          expect(row.idEstacion).toBe(ID_ESTACION);
          expect(row.nombre).toBe(NOMBRE_ESTACION);
        });
        it('should fail on non-existing', async () => {
          const query = readEstacion('XXX');
          expect(query).toBeInstanceOf(Promise);
          const row = await query;
          expect(row).toBeUndefined();
        });
      });
      describe('existeEstacion', () => {
        it('YYYY should exist', async () => {
          const query = existeEstacionPorNombre(NOMBRE_ESTACION);
          expect(query).toBeInstanceOf(Promise);
          const row = await query;
          expect(row).toBeTruthy();
        });
        it('XXXXX should not exist', async () => {
          const query = existeEstacionPorNombre('XXXXX');
          expect(query).toBeInstanceOf(Promise);
          const row = await query;
          expect(row).toBeFalsy();
        });
        it('YYY should exist', async () => {
          const query = existeEstacion(ID_ESTACION);
          expect(query).toBeInstanceOf(Promise);
          const row = await query;
          expect(row).toBeTruthy();
        });
        it('XXX should not exist', async () => {
          const query = existeEstacion('XXX');
          expect(query).toBeInstanceOf(Promise);
          const row = await query;
          expect(row).toBeFalsy();
        });
      });
      describe('updateEstacion', () => {
        it('change 1 record', async () => {
          const query = updateEstacion(ID_ESTACION, {
            latitud: 99,
          });
          expect(query).toBeInstanceOf(Promise);
          const result = await query;
          expect(result).toBeTruthy();
          const row = await readEstacion(ID_ESTACION);
          expect(row.latitud).toBe(99);
        });
        it('should fail on non-existing record', async () => {
          const query = updateEstacion('XXX', {
            latitud: 99,
          });
          expect(query).toBeInstanceOf(Promise);
          const result = await query;
          expect(result).toBeFalsy();
        });
      });
      describe('createEstacion', () => {
        it('should fail on duplicate', async () => {
          const query = createEstacion({
            nombre: NOMBRE_ESTACION,
            idEstacion: ID_ESTACION,
            latitud: 25,
            longitud: 52,
          });
          expect(query).toBeInstanceOf(Promise);
          const result = await query;
          expect(result).toBeFalsy();
        });
        it('should re-throw any other error', done => {
          createEstacion({
            nombre1: NOMBRE_ESTACION,
            idEstacion1: ID_ESTACION,
            latitud1: 25,
            longitud1: 52,
          })
            .then(() => {
              expect('It should not come this way').toBeFalsy();
            })
            .catch(() => {
              done();
            });
        });
      });
    });
  });
});
