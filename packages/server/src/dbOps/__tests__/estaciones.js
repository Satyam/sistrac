import {
  init,
  close
} from '../';

import {
  readEstaciones,
  createEstacion,
  existeEstacionPorNombre,
  existeEstacionPorSigla,
  updateEstacion,
  readEstacion,
  readEstacionPorNombre,
  readEstacionPorSigla,
  deleteEstacion,
} from '../estaciones';

const NOMBRE_ESTACION = 'YYYY';
const SIGLA_ESTACION = 'YYY';

describe('dbOps.estaciones', () => {
  beforeAll(init);
  afterAll(close);
  it('They should all be functions', () => {
    expect(typeof readEstaciones).toBe('function');
    expect(typeof createEstacion).toBe('function');
    expect(typeof existeEstacionPorNombre).toBe('function');
    expect(typeof existeEstacionPorSigla).toBe('function');
    expect(typeof updateEstacion).toBe('function');
    expect(typeof readEstacion).toBe('function');
    expect(typeof readEstacionPorNombre).toBe('function');
    expect(typeof readEstacionPorSigla).toBe('function');
    expect(typeof deleteEstacion).toBe('function');
  })
  describe('readEstaciones', () => {
    it('should return a list', async () => {
      const query = readEstaciones();
      expect(query).toBeInstanceOf(Promise);
      const rows = await query;
      expect(Array.isArray(rows)).toBeTruthy();
      rows.forEach(row => {
        expect(row).toEqual(expect.objectContaining({
          idEstacion: expect.any(Number),
          nombre: expect.any(String),
          latitud: expect.any(Number),
          longitud: expect.any(Number),
          sigla: expect.any(String),
        }));
        expect(row.sigla.length).toBe(3);
        expect(row.nombre.length).toBeGreaterThan(0);
      })
    })
  })
  describe('Con nueva estacion', () => {
    let idEstacion;
    beforeAll(async () => {
      const query = createEstacion({
        nombre: NOMBRE_ESTACION,
        sigla: SIGLA_ESTACION,
        latitud: 25,
        longitud: 52
      });
      expect(query).toBeInstanceOf(Promise);
      const result = await query;
      expect(typeof result).toBe('object');
      expect(result.success).toBeTruthy();
      expect(typeof result.idEstacion).toBe('number');
      idEstacion = result.idEstacion;
    })
    afterAll(async () => {
      const query = deleteEstacion(idEstacion);
      expect(query).toBeInstanceOf(Promise);
      const result = await query;
      expect(result).toEqual({
        success: true
      });
    })
    describe('readEstacion', () => {
      it('by id:should return the one asked for', async () => {
        const query = readEstacion(idEstacion);
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row.idEstacion).toBe(idEstacion);
        expect(row.nombre).toBe(NOMBRE_ESTACION);
        expect(row.sigla).toBe(SIGLA_ESTACION);
      })
      it('by name: should return the one asked for', async () => {
        const query = readEstacionPorNombre(NOMBRE_ESTACION);
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row.idEstacion).toBe(idEstacion);
        expect(row.nombre).toBe(NOMBRE_ESTACION);
        expect(row.sigla).toBe(SIGLA_ESTACION);
      })
      it('by sigla: should return the one asked for', async () => {
        const query = readEstacionPorSigla(SIGLA_ESTACION);
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row.idEstacion).toBe(idEstacion);
        expect(row.nombre).toBe(NOMBRE_ESTACION);
        expect(row.sigla).toBe(SIGLA_ESTACION);
      })
      it('should fail on non-existing', async () => {
        const query = readEstacion(0);
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row).toBeUndefined();
      })
    })
    describe('existeEstacion', () => {
      it('YYYY should exist', async () => {
        const query = existeEstacionPorNombre(NOMBRE_ESTACION);
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row).toEqual({
          success: true
        });
      })
      it('XXXXX should not exist', async () => {
        const query = existeEstacionPorNombre('XXXXX');
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row).toEqual({
          success: false
        });
      })
      it('YYY should exist', async () => {
        const query = existeEstacionPorSigla(SIGLA_ESTACION);
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row).toEqual({
          success: true
        });
      })
      it('XXX should not exist', async () => {
        const query = existeEstacionPorSigla('XXX');
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row).toEqual({
          success: false
        });
      })
    })
    describe('updateEstacion', () => {
      it('change 1 record', async () => {
        const query = updateEstacion(idEstacion, {
          latitud: 99
        });
        expect(query).toBeInstanceOf(Promise);
        const result = await query;
        expect(result).toEqual({
          success: true
        });
        const row = await readEstacion(idEstacion);
        expect(row.latitud).toBe(99);
      })
      it('should fail on non-existing record', async () => {
        const query = updateEstacion(0, {
          latitud: 99
        });
        expect(query).toBeInstanceOf(Promise);
        const result = await query;
        expect(result).toEqual({
          success: false
        });
      })
    })
    describe('createEstacion', () => {
      it('should fail on duplicate', async () => {
        const query = createEstacion({
          nombre: NOMBRE_ESTACION,
          sigla: SIGLA_ESTACION,
          latitud: 25,
          longitud: 52
        });
        expect(query).toBeInstanceOf(Promise);
        const result = await query;
        expect(typeof result).toBe('object');
        expect(result.success).toBeFalsy();
      })
    })
  })
})
