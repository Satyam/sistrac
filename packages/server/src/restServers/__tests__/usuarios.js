import md5 from 'md5';
import jwt from 'jsonwebtoken';

import { SECRET, COOKIE_NAME } from '../../../config';

import {
  initRoutes,
  testREST,
  Response,
  GET,
  POST,
  PUT,
  DELETE,
} from '../../testUtils';

import {
  OK,
  UNAUTHORIZED,
  BAD_REQUEST,
  CONFLICT,
  NO_CONTENT,
  NOT_FOUND,
  CREATED,
} from '../httpStatusCodes';

import { authenticate } from '../usuarios';

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

describe('restServers/usuarios', () => {
  beforeAll(() => {
    initRoutes();
  });
  describe('login', () => {
    it(
      'success',
      testREST({
        method: PUT,
        path: '/usuarios/login',
        queryResult: [
          { ...NUEVO_USUARIO, password: md5(NUEVO_USUARIO.password) },
        ],
        statusCode: OK,
        restResult: { ...NUEVO_USUARIO, ...roles, password: undefined },
        body: NUEVO_USUARIO,
      }),
    );
    it(
      'fail password',
      testREST({
        method: PUT,
        path: '/usuarios/login',
        queryResult: [
          { ...NUEVO_USUARIO, password: md5(NUEVO_USUARIO.password) },
        ],
        statusCode: UNAUTHORIZED,
        body: { ...NUEVO_USUARIO, password: 0 },
      }),
    );
    it(
      'fail usuario',
      testREST({
        method: PUT,
        path: '/usuarios/login',
        queryResult: [],
        statusCode: UNAUTHORIZED,
        body: { ...NUEVO_USUARIO, password: 0 },
      }),
    );
  });
  describe('signup', () => {
    it(
      'success',
      testREST({
        method: POST,
        path: '/usuarios/signup',
        queryResult: { insertId: 25 },
        statusCode: CREATED,
        body: NUEVO_USUARIO,
      }),
    );
    it(
      'fail faltan datos',
      testREST({
        method: POST,
        path: '/usuarios/signup',
        statusCode: BAD_REQUEST,
        restResult:
          'Favor de indicar código de usuario, contraseña y nombre completo.',
        body: { ...NUEVO_USUARIO, password: 0 },
      }),
    );
    it(
      'fail nombre existe',
      testREST({
        method: POST,
        path: '/usuarios/signup',
        queryResult: { affectedRows: 0 },
        statusCode: CONFLICT,
        body: NUEVO_USUARIO,
      }),
    );
  });
  describe('logout', () => {
    it(
      'success',
      testREST({
        method: GET,
        path: '/usuarios/logout',
        statusCode: NO_CONTENT,
      }),
    );
  });
  describe('userData', () => {
    it(
      'success',
      testREST({
        method: GET,
        path: '/usuarios/pepe',
        queryResult: [NUEVO_USUARIO],
        statusCode: OK,
        restResult: { ...NUEVO_USUARIO, ...roles, password: undefined },
      }),
    );
    it(
      'fail',
      testREST({
        method: GET,
        path: '/usuarios/pepe',
        queryResult: [],
        statusCode: NOT_FOUND,
      }),
    );
  });
  describe('delete', () => {
    it(
      'success',
      testREST({
        method: DELETE,
        path: '/usuarios/25',
        queryResult: { affectedRows: 1 },
        statusCode: NO_CONTENT,
      }),
    );
    it(
      'fail',
      testREST({
        method: DELETE,
        path: '/usuarios/999',
        queryResult: { affectedRows: 0 },
        statusCode: NOT_FOUND,
      }),
    );
  });
  describe('update', () => {
    it(
      'success',
      testREST({
        method: PUT,
        path: '/usuarios/25',
        queryResult: { affectedRows: 1 },
        statusCode: NO_CONTENT,
        body: NUEVO_USUARIO,
      }),
    );
    it(
      'fail',
      testREST({
        method: PUT,
        path: '/usuarios/999',
        queryResult: { affectedRows: 0 },
        statusCode: NOT_FOUND,
        body: NUEVO_USUARIO,
      }),
    );
  });
  describe('authenticate', () => {
    it('success', done => {
      const req = {
        method: GET,
        path: 'whatever',
        cookies: {
          [COOKIE_NAME]: jwt.sign({ ...NUEVO_USUARIO, ...roles }, SECRET),
        },
      };

      authenticate(
        req,
        new Response(() => {
          expect('Should not come this way').toBeFalsy();
        }),
        () => {
          expect(req.user).toEqual({ ...NUEVO_USUARIO, ...roles });
          done();
        },
      );
    });
    it('skip on login', done => {
      const req = {
        method: GET,
        path: '.... /login',
        cookies: {
          [COOKIE_NAME]: jwt.sign({ ...NUEVO_USUARIO, ...roles }, SECRET),
        },
      };
      authenticate(
        req,
        new Response(() => {
          expect('Should not come this way').toBeFalsy();
        }),
        () => {
          expect(req.user).toBeUndefined();
          done();
        },
      );
    });
    it('skip on signup', done => {
      const req = {
        method: GET,
        path: '.... /login',
        cookies: {
          [COOKIE_NAME]: jwt.sign({ ...NUEVO_USUARIO, ...roles }, SECRET),
        },
      };
      authenticate(
        req,
        new Response(() => {
          expect('Should not come this way').toBeFalsy();
        }),
        () => {
          expect(req.user).toBeUndefined();
          done();
        },
      );
    });
    it('fail bad token', done => {
      const req = {
        method: GET,
        path: 'whatever',
        cookies: {
          [COOKIE_NAME]: jwt.sign(
            { ...NUEVO_USUARIO, ...roles },
            `${SECRET} asdf`,
          ),
        },
      };

      authenticate(
        req,
        new Response(status => {
          expect(status).toBe(UNAUTHORIZED);
          expect(req.user).toBeUndefined();
          done();
        }),
        () => {
          expect('Should not come this way').toBeFalsy();
        },
      );
    });
    it('fail no token', done => {
      const req = {
        method: GET,
        path: 'whatever',
        cookies: {},
      };
      authenticate(
        req,
        new Response(status => {
          expect(status).toBe(UNAUTHORIZED);
          expect(req.user).toBeUndefined();
          done();
        }),
        () => {
          expect('Should not come this way').toBeFalsy();
        },
      );
    });
  });
});
