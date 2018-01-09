let db;

export default function init(db1) {
  db = db1;
}

export function readEventosPorTren(idTren) {
  return db.query('SELECT * FROM `Eventos` WHERE idTren = ?', [idTren]);
}
export function readEventosPorEstacion(idEstacion) {
  return db.query('SELECT * FROM `Eventos` WHERE idEstacion = ?', [idEstacion]);
}

export function readEvento(idEvento) {
  return db.queryRow('select * from Eventos where idEvento = ?', [idEvento]);
}
