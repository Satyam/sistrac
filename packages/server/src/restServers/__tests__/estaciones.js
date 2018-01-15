import {
  MysqlError,
  initRoutes,
  testREST,
  GET,
  POST,
  PUT,
  DELETE,
} from '../../utils/testUtils';

import {
  OK,
  NOT_FOUND,
  NO_CONTENT,
  CONFLICT,
  CREATED,
} from '../../utils/httpStatusCodes';

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
  describe('get /RET', () => {
    it(
      'success',
      testREST({
        method: GET,
        path: '/estaciones/RET',
        queryResult: [{ idEstacion: 'RET', nombre: 'Retiro' }],
        statusCode: OK,
        restResult: { idEstacion: 'RET', nombre: 'Retiro' },
      }),
    );
    it(
      'fail',
      testREST({
        method: GET,
        path: '/estaciones/XXX',
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
        queryResult: [{ idEstacion: 'RET', nombre: 'Retiro' }],
        statusCode: OK,
        restResult: { idEstacion: 'RET', nombre: 'Retiro' },
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
  describe('get /idEstacion', () => {
    it(
      'success',
      testREST({
        method: GET,
        path: '/estaciones/RET',
        queryResult: [{ idEstacion: 'RET', nombre: 'Retiro' }],
        statusCode: OK,
        restResult: { idEstacion: 'RET', nombre: 'Retiro' },
      }),
    );
    it(
      'fail',
      testREST({
        method: GET,
        path: '/estaciones/XXX',
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
  describe('get /existe/ id', () => {
    it(
      '/RET success',
      testREST({
        method: GET,
        path: '/estaciones/existe/RET',
        queryResult: [{ hay: 1 }],
        statusCode: OK,
      }),
    );
    it(
      '/YYY fail',
      testREST({
        method: GET,
        path: '/estaciones/existe/YYY',
        queryResult: [{ hay: 0 }],
        statusCode: NOT_FOUND,
      }),
    );
  });
  describe('put', () => {
    it(
      '/RET success',
      testREST({
        method: PUT,
        path: '/estaciones/RET',
        queryResult: { affectedRows: 1 },
        statusCode: NO_CONTENT,
        body: {
          nombre: 'Retiro',
        },
      }),
    );
    it(
      '/XXX fail',
      testREST({
        method: PUT,
        path: '/estaciones/XXX',
        queryResult: { affectedRows: 0 },
        statusCode: NOT_FOUND,
        body: {
          nombre: 'Retiro',
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
        queryResult: { affectedRows: 1 },
        statusCode: CREATED,
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
      '/RET success',
      testREST({
        method: DELETE,
        path: '/estaciones/RET',
        queryResult: { affectedRows: 1 },
        statusCode: NO_CONTENT,
      }),
    );
    it(
      '/XXX fail',
      testREST({
        method: DELETE,
        path: '/estaciones/XXX',
        queryResult: { affectedRows: 0 },
        statusCode: NOT_FOUND,
      }),
    );
  });
});
