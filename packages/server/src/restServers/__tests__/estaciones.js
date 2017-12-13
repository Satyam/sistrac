import {
  MysqlError,
  initRoutes,
  testREST,
  GET,
  POST,
  PUT,
  DELETE,
} from '../../testUtils';

import {
  OK,
  NOT_FOUND,
  NO_CONTENT,
  CONFLICT,
  CREATED,
} from '../httpStatusCodes';

describe('restServers/estaciones', () => {
  beforeAll(() => {
    initRoutes();
  });
  describe('/', () => {
    it(
      'should provide a list of estaciones',
      testREST({
        method: GET,
        path: '/estaciones/',
        queryResult: [{ id: 1, dato: 'uno' }, { id: 2, dato: 'dos' }],
        statusCode: OK,
        restResult: [{ id: 1, dato: 'uno' }, { id: 2, dato: 'dos' }],
      }),
    );
  });
  describe('get /25', () => {
    it(
      'success',
      testREST({
        method: GET,
        path: '/estaciones/25',
        queryResult: [{ idEstacion: 25, nombre: 'Retiro', sigla: 'RET' }],
        statusCode: OK,
        restResult: { idEstacion: 25, nombre: 'Retiro', sigla: 'RET' },
      }),
    );
    it(
      'fail',
      testREST({
        method: GET,
        path: '/estaciones/25',
        queryResult: [],
        statusCode: NOT_FOUND,
      }),
    );
  });
  describe('get /nombre/nombre', () => {
    it(
      'success',
      testREST({
        method: GET,
        path: '/estaciones/nombre/Retiro',
        queryResult: [{ idEstacion: 25, nombre: 'Retiro', sigla: 'RET' }],
        statusCode: OK,
        restResult: { idEstacion: 25, nombre: 'Retiro', sigla: 'RET' },
      }),
    );
    it(
      'fail',
      testREST({
        method: GET,
        path: '/estaciones/nombre/Retiro',
        queryResult: [],
        statusCode: NOT_FOUND,
      }),
    );
  });
  describe('get /sigla/sigla', () => {
    it(
      'success',
      testREST({
        method: GET,
        path: '/estaciones/sigla/RET',
        queryResult: [{ idEstacion: 25, nombre: 'Retiro', sigla: 'RET' }],
        statusCode: OK,
        restResult: { idEstacion: 25, nombre: 'Retiro', sigla: 'RET' },
      }),
    );
    it(
      'fail',
      testREST({
        method: GET,
        path: '/estaciones/sigla/RET',
        queryResult: [],
        statusCode: NOT_FOUND,
      }),
    );
  });
  describe('get /existe/nombre', () => {
    it(
      '/Retiro success',
      testREST({
        method: GET,
        path: '/estaciones/existe/nombre/Retiro',
        queryResult: [{ hay: 1 }],
        statusCode: OK,
      }),
    );
    it(
      '/YYYY fail',
      testREST({
        method: GET,
        path: '/estaciones/existe/nombre/YYYY',
        queryResult: [{ hay: 0 }],
        statusCode: NOT_FOUND,
      }),
    );
  });
  describe('get /existe/sigla', () => {
    it(
      '/RET success',
      testREST({
        method: GET,
        path: '/estaciones/existe/sigla/RET',
        queryResult: [{ hay: 1 }],
        statusCode: OK,
      }),
    );
    it(
      '/YYY fail',
      testREST({
        method: GET,
        path: '/estaciones/existe/sigla/YYY',
        queryResult: [{ hay: 0 }],
        statusCode: NOT_FOUND,
      }),
    );
  });
  describe('put', () => {
    it(
      '/25 success',
      testREST({
        method: PUT,
        path: '/estaciones/25',
        queryResult: { affectedRows: 1 },
        statusCode: NO_CONTENT,
        body: {
          nombre: 'Retiro',
          sigla: 'RET',
        },
      }),
    );
    it(
      '/9999 fail',
      testREST({
        method: PUT,
        path: '/estaciones/9999',
        queryResult: { affectedRows: 0 },
        statusCode: NOT_FOUND,
        body: {
          nombre: 'Retiro',
          sigla: 'RET',
        },
      }),
    );
  });
  describe('post', () => {
    it(
      'success',
      testREST({
        method: POST,
        path: '/estaciones/',
        queryResult: { insertId: 42 },
        statusCode: CREATED,
        restResult: { idEstacion: 42 },
      }),
    );
    it(
      'duplicate',
      testREST({
        method: POST,
        path: '/estaciones/',
        queryResult: new MysqlError('ER_DUP_ENTRY'),
        statusCode: CONFLICT,
      }),
    );
  });
  describe('delete', () => {
    it(
      '/25 success',
      testREST({
        method: DELETE,
        path: '/estaciones/25',
        queryResult: { affectedRows: 1 },
        statusCode: NO_CONTENT,
      }),
    );
    it(
      '/9999 fail',
      testREST({
        method: DELETE,
        path: '/estaciones/9999',
        queryResult: { affectedRows: 0 },
        statusCode: NOT_FOUND,
      }),
    );
  });
});
