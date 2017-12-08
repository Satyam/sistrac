import {
  init,
  close
} from '../';
import {
  readEstaciones,
  insertEstacion,
  verificarEstacionExiste,
  updateEstacion,
  readEstacion,
  deleteEstacion,
} from '../estaciones';


describe('dbOps.estaciones', () => {
  beforeAll(init);
  afterAll(close);
  it ('They should all be functions', () => {
    expect(typeof readEstaciones).toBe('function');
    expect(typeof insertEstacion).toBe('function');
    expect(typeof verificarEstacionExiste).toBe('function');
    expect(typeof updateEstacion).toBe('function');
    expect(typeof readEstacion).toBe('function');
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
      })
    })
  })
  describe('Con nueva estacion', () => {
    let idEstacion;
    beforeAll(async () => {
      const query = insertEstacion({
        nombre: 'YYYY',
        sigla: 'YYY',
        latitud: 25,
        longitud: 52
      });
      expect(query).toBeInstanceOf(Promise);
      const result = await query;
      expect(typeof result).toBe('object');
      expect(typeof result.idEstacion).toBe('number');
      idEstacion = result.idEstacion;
    })
    afterAll(async() => {
      const query = deleteEstacion(idEstacion);
      expect(query).toBeInstanceOf(Promise);
      const result = await query;
      expect(result).toEqual({
        affected: 1
      });
    })
    describe('readEstacion', () => {
      it('should return the one asked for', async () => {
        const query = readEstacion(idEstacion);
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row.idEstacion).toBe(idEstacion);
        expect(row.nombre).toBe('YYYY');
        expect(row.sigla).toBe('YYY');
      })
      it('should fail on non-existing', async () => {
        const query = readEstacion(0);
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row).toBeUndefined();
      })
    })
    describe('verificarEstacionExiste', () => {
      it('YYYY should exist', async () => {
        const query = verificarEstacionExiste('YYYY');
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row).toEqual({hay: 1});
      })
      it('XXXXX should not exist', async () => {
        const query = verificarEstacionExiste('XXXXX');
        expect(query).toBeInstanceOf(Promise);
        const row = await query;
        expect(row).toEqual({hay: 0});
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
          affected: 1
        });
        const query1 = readEstacion(idEstacion);
        const row = await query1;
        expect(row.latitud).toBe(99);
      })
      it('should fail on non-existing record', async () => {
        const query = updateEstacion(0, {
          Latitud: 99
        });
        expect(query).toBeInstanceOf(Promise);
        const result = await query;
        expect(result).toEqual({
          affected: 0
        });
        const query1 = readEstacion(idEstacion);
        const row = await query1;
        expect(row.latitud).toBe(99);
      })
    })
  })
})
