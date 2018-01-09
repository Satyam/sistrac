let db;

export default function init(db1) {
  db = db1;
}

export function readItinerarios() {
  return db.query('select * from Itinerarios');
}

export function readItinerario(idItinerario) {
  return db.queryRow('select * from Itinerarios where idItinerario = ?', [
    idItinerario,
  ]);
}

export function readItinerariosPorEstacion(idEstacion) {
  return db.query(
    'SELECT Itinerarios.* FROM `Itinerarios` join Escalas using(idItinerario) where idEstacion = ?',
    [idEstacion],
  );
}
