let db;

export default function init(db1) {
  db = db1;
}

export function eventosPorTren(idTren) {
  return db.query('SELECT * FROM `Eventos` WHERE idTren = ?', [idTren]);
}
export function eventosPorEstacion(idEstacion) {
  return db.query('SELECT * FROM `Eventos` WHERE idEstacion = ?', [idEstacion]);
}