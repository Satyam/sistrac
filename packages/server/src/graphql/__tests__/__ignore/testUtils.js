import { format } from 'mysql';
import { graphql } from 'graphql';
import { Source } from 'graphql/language/source';
import { parse } from 'graphql/language/parser';
import { validate as graphQlValidate } from 'graphql/validation/validate';

import { init as initDb } from '../../../dbOps';

export class MockDb {
  constructor() {
    this.sqlQueries = require('./queries.json');
    this.sql = [];
  }
  clearQueries() {
    this.sql = [];
  }
  getQueries() {
    return this.sql;
  }
  query(...args) {
    return new Promise(resolve => {
      const sql = format(...args);
      this.sql.push(sql);
      resolve(this.sqlQueries[sql] || `Not found: ${sql}`);
    });
  }
}
export const tester = schema => {
  const mockDb = new MockDb();
  initDb(mockDb);
  return async query => {
    const val = validate(schema, query);
    if (val.length) {
      return { validate: val };
    }
    const result = await graphql(schema, query);
    result.sql = mockDb.getQueries();
    mockDb.clearQueries();
    return result;
  };
};

export const validate = (schema, query) => {
  const source = new Source(query);
  const ast = parse(source);
  return graphQlValidate(schema, ast);
};
