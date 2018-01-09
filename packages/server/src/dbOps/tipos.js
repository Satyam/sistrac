let db;

export default function init(db1) {
  db = db1;
}

export function readTiposEventos() {
  return db.query('select * from TipoEvento');
}

export function readTipoEvento(idTipoEvento) {
  return db.queryRow('select * from TipoEvento where idTipoEvento = ?', [
    idTipoEvento,
  ]);
}

export function readTiposEmergencias() {
  return db.query('select * from TipoEmergencias');
}

export function readTipoEmergencia(idTipoEmergencia) {
  return db.query('select * from TipoEmergencias where idTipoEmergencia = ?', [
    idTipoEmergencia,
  ]);
}
