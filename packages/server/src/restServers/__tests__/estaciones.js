import {
  MysqlError,
  initRoutes,
  testREST,
  GET,
  POST,
  PUT,
  DELETE,
} from '../../testUtils';

describe('restServers/estaciones', () => {
  beforeAll(() => {
    initRoutes();
  });
  describe('/', () => {
    it(
      'should provide a list of estaciones',
      testREST(
        GET,
        '/estaciones/',
        [{ id: 1, dato: 'uno' }, { id: 2, dato: 'dos' }],
        200,
        [{ id: 1, dato: 'uno' }, { id: 2, dato: 'dos' }],
      ),
    );
  });
  describe('get /25', () => {
    it(
      'success',
      testREST(
        GET,
        '/estaciones/25',
        [{ idEstacion: 25, nombre: 'Retiro', sigla: 'RET' }],
        200,
        { idEstacion: 25, nombre: 'Retiro', sigla: 'RET' },
      ),
    );
    it('fail', testREST(GET, '/estaciones/25', [], 404));
  });
  describe('get /nombre/nombre', () => {
    it(
      'success',
      testREST(
        GET,
        '/estaciones/nombre/Retiro',
        [{ idEstacion: 25, nombre: 'Retiro', sigla: 'RET' }],
        200,
        { idEstacion: 25, nombre: 'Retiro', sigla: 'RET' },
      ),
    );
    it('fail', testREST(GET, '/estaciones/nombre/Retiro', [], 404));
  });
  describe('get /sigla/sigla', () => {
    it(
      'success',
      testREST(
        GET,
        '/estaciones/sigla/RET',
        [{ idEstacion: 25, nombre: 'Retiro', sigla: 'RET' }],
        200,
        { idEstacion: 25, nombre: 'Retiro', sigla: 'RET' },
      ),
    );
    it('fail', testREST(GET, '/estaciones/sigla/RET', [], 404));
  });
  describe('get /existe/nombre', () => {
    it(
      '/Retiro success',
      testREST(GET, '/estaciones/existe/nombre/Retiro', [{ hay: 1 }], 200),
    );
    it(
      '/YYYY fail',
      testREST(GET, '/estaciones/existe/nombre/YYYY', [{ hay: 0 }], 404),
    );
  });
  describe('get /existe/sigla', () => {
    it(
      '/RET success',
      testREST(GET, '/estaciones/existe/sigla/RET', [{ hay: 1 }], 200),
    );
    it(
      '/YYY fail',
      testREST(GET, '/estaciones/existe/sigla/YYY', [{ hay: 0 }], 404),
    );
  });
  describe('put', () => {
    it(
      '/25 success',
      testREST(PUT, '/estaciones/25', { affectedRows: 1 }, 204, undefined, {
        nombre: 'Retiro',
        sigla: 'RET',
      }),
    );
    it(
      '/9999 fail',
      testREST(PUT, '/estaciones/9999', { affectedRows: 0 }, 404, undefined, {
        nombre: 'Retiro',
        sigla: 'RET',
      }),
    );
  });
  describe('post', () => {
    it(
      'success',
      testREST(POST, '/estaciones/', { insertId: 42 }, 201, { idEstacion: 42 }),
    );
    it(
      'duplicate',
      testREST(POST, '/estaciones/', new MysqlError('ER_DUP_ENTRY'), 409),
    );
  });
  describe('delete', () => {
    it(
      '/25 success',
      testREST(DELETE, '/estaciones/25', { affectedRows: 1 }, 204),
    );
    it(
      '/9999 fail',
      testREST(DELETE, '/estaciones/9999', { affectedRows: 0 }, 404),
    );
  });
});
