// import fs from 'fs';
// import { resolve } from 'path';

import mysql from 'node-mysql-promise2';
import initEstaciones from './estaciones';
import initUsuarios from './usuarios';
import initTipos from './tipos';
import initEventos from './eventos';
import initTrenes from './trenes';
import initEscalas from './escalas';
import initItinerarios from './itinerarios';

let db;

// let queries = {};
// const fName = resolve(
//   __dirname.replace('/lib/', '/src/'),
//   '../graphql/__tests__/__ignore/queries.json',
// );

export async function init(mock) {
  db =
    mock ||
    (await mysql.createConnection({
      host: process.env.REACT_APP_SQL_HOST,
      user: process.env.REACT_APP_SQL_USER,
      password: process.env.REACT_APP_SQL_PASSWORD,
      database: process.env.REACT_APP_DB_NAME,
      charset: 'utf8_spanish_ci',
    }));

  // const f = fs.readFileSync(fName);
  // if (f) {
  //   queries = JSON.parse(f);
  // }
  //
  // const q = db.query.bind(db);
  //
  // db.query = (...args) => {
  //   const sql = db.format(...args);
  //   return q(...args).then(result => {
  //     queries[sql] = result;
  //     return result;
  //   });
  // };

  db.queryRow = (...args) => db.query(...args).then(result => result[0]);
  initEstaciones(db);
  initUsuarios(db);
  initTipos(db);
  initEventos(db);
  initTrenes(db);
  initEscalas(db);
  initItinerarios(db);
  return db;
}

export function close() {
  // fs.writeFileSync(fName, JSON.stringify(queries, null, 2));
  db.destroy();
}
