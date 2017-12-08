import { init, close  } from '../index';

describe('dbOps/index', () => {
  describe('init', () => {
    it('should be a function', () => {
      expect(typeof init).toBe('function');
    });
    describe('calling init', () => {
      let p;
      let db;
      beforeAll(() => {
        p = init();
      });
      afterAll(() => {
        close();
      })
      it('should return a Promise', () => {
        expect(p).toBeInstanceOf(Promise);
      });
      it('should resolve to a connection object', () =>
        p.then((connection) => {
          db = connection;
          expect(typeof db.query).toBe('function');
          expect(typeof db.destroy).toBe('function');
        }));
      it('should be able to perform queries', async () => {
        const rows = await db.query('select 42 as value');
        expect(rows[0].value).toBe(42);
      });
      it('should contain required tables', async () => {
        const rows = await db.query('show tables');
        const field = Object.keys(rows[0])[0];
        const tables = rows.map(row => row[field]);
        const expected = [
          'Escalas',
          'Estaciones',
          'Eventos',
          'Itinerarios',
          'Pings',
          'Revisiones',
          'TipoEmergencias',
          'TipoEvento',
          'Trenes',
          'Usuarios',
        ]
        expect(tables.length).toBe(expected.length);
        expect(tables).toEqual(expect.arrayContaining(expected));
      });
    });
  });
  describe('close', () => {
    it('should be a function', () => {
      expect(typeof close).toBe('function');
    });
  });
});
