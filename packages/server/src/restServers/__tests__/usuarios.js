import md5 from 'md5';

import {
  MysqlError,
  initRoutes,
  testREST,
  GET,
  POST,
  PUT,
  DELETE,
} from '../../testUtils';

import { OK, UNAUTHORIZED } from '../httpStatusCodes';

const NUEVO_USUARIO = {
  usuario: 'pepe',
  password: '123456789',
  nombre: 'José Pérez',
};

const roles = {
  rolDios: false,
  rolGuarda: false,
  rolMecanico: false,
  rolSupervisor: false,
};

describe('restServers/estaciones', () => {
  beforeAll(() => {
    initRoutes();
  });
  describe('login', () => {
    it(
      'success',
      testREST(
        PUT,
        '/usuarios/login',
        [{ ...NUEVO_USUARIO, password: md5(NUEVO_USUARIO.password) }],
        OK,
        { ...NUEVO_USUARIO, ...roles, password: undefined },
        NUEVO_USUARIO,
      ),
    );
    it(
      'fail',
      testREST(
        PUT,
        '/usuarios/login',
        [{ ...NUEVO_USUARIO, password: md5(NUEVO_USUARIO.password) }],
        UNAUTHORIZED,
        undefined,
        { ...NUEVO_USUARIO, password: 0 },
      ),
    );
  });
});
