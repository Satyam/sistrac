import { format } from 'mysql';
import { Router as createRouter } from 'express';

import { init as initDb } from './dbOps';
import initRouter from './restServers';

export class MysqlError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
export class MockDb {
  constructor(result) {
    this.result = result;
  }
  query(...args) {
    return new Promise((resolve, reject) => {
      this.sql = format(...args);
      if (this.result instanceof MysqlError) {
        reject(this.result);
      } else resolve(this.result);
    });
  }
}
export const testMethod = (
  method,
  queryResult,
  methodResult,
  ...args
) => async done => {
  const mockDb = new MockDb(queryResult);
  initDb(mockDb);
  const query = await method(...args);
  expect(query).toEqual(methodResult);
  expect(mockDb.sql).toMatchSnapshot();
  done();
};

export class Response {
  constructor(done) {
    this.done = done;
    this.statusCode = 200;
    this.cookies = {};
  }
  status(value) {
    this.statusCode = value;
    return this;
  }
  json(value) {
    this.done(this.statusCode, value);
  }
  send(value) {
    this.done(this.statusCode, value);
  }
  end() {
    this.done(this.statusCode);
  }
  cookie(name, value, opts) {
    this.cookies[name] = value;
  }
  clearCookie(name) {
    delete this.cookies[name];
  }
}

let dataRouter;
export function initRoutes() {
  dataRouter = createRouter();
  initRouter(dataRouter);
}

export const testREST = (
  method,
  path,
  queryResult,
  status,
  restResult,
  body,
) => async done => {
  const mockDb = new MockDb(queryResult);
  const res = new Response((st, resp) => {
    expect(st).toBe(status);
    expect(resp).toEqual(restResult);
    expect(mockDb.sql).toMatchSnapshot();
    done();
  });
  initDb(mockDb);
  dataRouter(
    {
      method,
      url: path,
      baseUrl: '/',
      path,
      body,
    },
    res,
    () => {
      expect('Next should not be called').toBeFalsy();
    },
  );
};

export const GET = 'GET';
export const PUT = 'PUT';
export const POST = 'POST';
export const DELETE = 'DELETE';
