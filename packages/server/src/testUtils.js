import { format } from 'mysql';
import { Router as createRouter } from 'express';
import jwt from 'jsonwebtoken';

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
    this.done(this.statusCode, value, this.cookies);
  }
  send(value) {
    this.done(this.statusCode, value, this.cookies);
  }
  end() {
    this.done(this.statusCode, null, this.cookies);
  }
  cookie(name, value /* opts */) {
    const decoded = jwt.decode(value);
    if (decoded) {
      delete decoded.iat;
      this.cookies[name] = decoded;
    } else this.cookies[name] = value;
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

export const testREST = ({
  method,
  path,
  queryResult,
  statusCode,
  restResult,
  body,
}) => async done => {
  const mockDb = new MockDb(queryResult);
  const res = new Response((status, resp, cookies) => {
    expect(status).toBe(statusCode);
    expect(resp).toEqual(restResult || null);
    expect(cookies).toMatchSnapshot();
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
