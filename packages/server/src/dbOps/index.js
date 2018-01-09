import mysql from 'node-mysql-promise2';
import { SQL_HOST, DB_NAME, SQL_USER, SQL_PASSWORD } from '../config';
import initEstaciones from './estaciones';
import initUsuarios from './usuarios';
import initTipos from './tipos';
import initEventos from './eventos';
import initTrenes from './trenes';
import initEscalas from './escalas';
import initItinerarios from './itinerarios';

let db;

export async function init(mock) {
  db =
    mock ||
    (await mysql.createConnection({
      host: SQL_HOST,
      user: SQL_USER,
      password: SQL_PASSWORD,
      database: DB_NAME,
      charset: 'utf8_spanish_ci',
    }));
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
  db.destroy();
}
