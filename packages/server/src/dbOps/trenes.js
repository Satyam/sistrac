let db;

export default function init(db1) {
  db = db1;
}

export function readTrenesPorEstacion(idEstacion) {
  return db.query(
    'SELECT Trenes.* FROM Escalas JOIN Trenes USING(idItinerario) WHERE idEstacion = ?',
    [idEstacion],
  );
}

export function readTrenesPorItinerario(idItinerario) {
  return db.query('select * from Trenes where idItinerario = ?', [
    idItinerario,
  ]);
}

export function readTren(idTren) {
  return db.queryRow('select * from Trenes where idTren = ?', [idTren]);
}
