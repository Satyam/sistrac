import mysql from 'node-mysql-promise2';
import { SQL_HOST, DB_NAME, SQL_USER, SQL_PASSWORD } from '../../config';
import { init as initEstaciones } from './estaciones';
import { init as initUsuarios } from './usuarios';
import { init as initTipos } from './tipos';

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
  initEstaciones(db);
  initUsuarios(db);
  initTipos(db);
  return db;
}

export function close() {
  db.destroy();
}
