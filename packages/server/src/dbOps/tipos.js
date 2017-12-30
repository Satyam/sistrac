let db;

export default function init(db1) {
  db = db1;
}

export function readTiposEventos() {
  return db.query('select * from TipoEvento');
}

export function readTiposEmergencias() {
  return db.query('select * from TipoEmergencias');
}
