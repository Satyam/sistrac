import mysql from 'node-mysql-promise2';
import { SQL_HOST, DB_NAME, SQL_USER, SQL_PASSWORD } from '../config';

let db;

export async function init() {
  db = await mysql.createConnection({
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: DB_NAME,
    charset: 'utf8_spanish_ci',
  });
}

export function close() {
  db.destroy();
}

export function readUsuarioByUsername(username) {
  return db.query('select * from usuarios where Usuario = ?', [username]);
}

export function createUsuario(values) {
  return db.query('insert into usuarios SET ?', values);
}

export function readEstaciones() {
  return db.query('SELECT * FROM estaciones ORDER BY Nombre');
}

export function verificarEstacionExiste(id, nombre) {
  return db.query('SELECT COUNT(Nombre) AS hay FROM estaciones WHERE Nombre = ? AND ID != ?', [
    nombre,
    id,
  ]);
}

export function updateEstacion(data) {
  return db.query('update estaciones set ?', data);
}

