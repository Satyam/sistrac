let db;

export default function init(db1) {
  db = db1;
}

export function readEscala(idEscala) {
  return db.queryRow('select * from Escalas where idEscala = ?', [idEscala]);
}
export function readEscalasPorEstacion(idEstacion) {
  return db.query('select * from Escalas where idEstacion = ?', [idEstacion]);
}
export function readEscalasPorItinerario(idItinerario) {
  return db.query('select * from Escalas where idItinerario = ?', [
    idItinerario,
  ]);
}
