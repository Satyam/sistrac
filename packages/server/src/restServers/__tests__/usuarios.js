import jwt from 'jsonwebtoken';

import { SECRET, COOKIE_NAME } from '../../config';

import {
  initRoutes,
  testREST,
  Response,
  GET,
  POST,
  PUT,
  DELETE,
} from '../../utils/testUtils';

import {
  OK,
  UNAUTHORIZED,
  BAD_REQUEST,
  CONFLICT,
  NO_CONTENT,
  NOT_FOUND,
  CREATED,
} from '../../utils/httpStatusCodes';

import {
  esDios,
  esGuarda,
  esSupervisor,
  esMecanico,
  tieneNivel,
} from '../usuarios';

import authenticate from '../../utils/authenticate';

const NUEVO_USUARIO = {
  usuario: 'pepe',
  nombre: 'José Pérez',
};

const PWD = {
  password: '123456789',
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
        queryResult: [NUEVO_USUARIO],
        statusCode: OK,
        restResult: { ...NUEVO_USUARIO, ...roles },
        body: { ...NUEVO_USUARIO, ...PWD },
      }),
    );
    it(
      'fail password',
      testREST({
        method: PUT,
        path: '/usuarios/login',
        queryResult: [],
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
        body: { ...NUEVO_USUARIO, ...PWD },
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
        body: NUEVO_USUARIO,
      }),
    );
    it(
      'fail nombre existe',
      testREST({
        method: POST,
        path: '/usuarios/signup',
        queryResult: { affectedRows: 0 },
        statusCode: CONFLICT,
        body: { ...NUEVO_USUARIO, ...PWD },
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
  // esDios,
  //   esGuarda,
  //   esSupervisor,
  //   esMecanico,
  //   tieneNivel,
  describe('funciones de seguridad', () => {
    describe('esDios', () => {
      it('success', done => {
        esDios(
          {
            user: {
              rolDios: true,
            },
          },
          new Response(() => {
            expect('Should not come this way').toBeFalsy();
          }),
          () => {
            done();
          },
        );
      });
      it('fail no user data', () => {
        esDios(
          {},
          new Response(status => {
            expect(status).toBe(UNAUTHORIZED);
          }),
          () => {
            expect('Should not come this way').toBeFalsy();
          },
        );
      });
      it('fail: not dios', () => {
        esDios(
          {
            user: {
              rolDios: false,
            },
          },
          new Response(status => {
            expect(status).toBe(UNAUTHORIZED);
          }),
          () => {
            expect('Should not come this way').toBeFalsy();
          },
        );
      });
    });
    describe('esSupervisor', () => {
      it('success', done => {
        esSupervisor(
          {
            user: {
              rolSupervisor: true,
            },
          },
          new Response(() => {
            expect('Should not come this way').toBeFalsy();
          }),
          () => {
            done();
          },
        );
      });
      it('fail no user data', () => {
        esSupervisor(
          {},
          new Response(status => {
            expect(status).toBe(UNAUTHORIZED);
          }),
          () => {
            expect('Should not come this way').toBeFalsy();
          },
        );
      });
      it('fail: not supervisor', () => {
        esSupervisor(
          {
            user: {
              rolSupervisor: false,
            },
          },
          new Response(status => {
            expect(status).toBe(UNAUTHORIZED);
          }),
          () => {
            expect('Should not come this way').toBeFalsy();
          },
        );
      });
    });
    describe('esMecanico', () => {
      it('success', done => {
        esMecanico(
          {
            user: {
              rolMecanico: true,
            },
          },
          new Response(() => {
            expect('Should not come this way').toBeFalsy();
          }),
          () => {
            done();
          },
        );
      });
      it('fail no user data', () => {
        esMecanico(
          {},
          new Response(status => {
            expect(status).toBe(UNAUTHORIZED);
          }),
          () => {
            expect('Should not come this way').toBeFalsy();
          },
        );
      });
      it('fail: not mecanico', () => {
        esMecanico(
          {
            user: {
              rolMecanico: false,
            },
          },
          new Response(status => {
            expect(status).toBe(UNAUTHORIZED);
          }),
          () => {
            expect('Should not come this way').toBeFalsy();
          },
        );
      });
    });
    describe('esGuarda', () => {
      it('success', done => {
        esGuarda(
          {
            user: {
              rolGuarda: true,
            },
          },
          new Response(() => {
            expect('Should not come this way').toBeFalsy();
          }),
          () => {
            done();
          },
        );
      });
      it('fail no user data', () => {
        esGuarda(
          {},
          new Response(status => {
            expect(status).toBe(UNAUTHORIZED);
          }),
          () => {
            expect('Should not come this way').toBeFalsy();
          },
        );
      });
      it('fail: not guarda', () => {
        esGuarda(
          {
            user: {
              rolGuarda: false,
            },
          },
          new Response(status => {
            expect(status).toBe(UNAUTHORIZED);
          }),
          () => {
            expect('Should not come this way').toBeFalsy();
          },
        );
      });
    });
    describe('tieneNivel', () => {
      it('success: cumple mínimo', done => {
        tieneNivel(5)(
          {
            user: {
              nivel: 20,
            },
          },
          new Response(() => {
            expect('Should not come this way').toBeFalsy();
          }),
          done,
        );
      });
      it('fail: faltan datos usuario', () => {
        tieneNivel(5)(
          {},
          new Response(status => {
            expect(status).toBe(UNAUTHORIZED);
          }),
          () => {
            expect('Should not come this way').toBeFalsy();
          },
        );
      });
      it('fail: no alcanza el minimo', () => {
        tieneNivel(5)(
          {
            user: {
              nivel: 1,
            },
          },
          new Response(status => {
            expect(status).toBe(UNAUTHORIZED);
          }),
          () => {
            expect('Should not come this way').toBeFalsy();
          },
        );
      });
    });
  });
});
