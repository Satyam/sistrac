let db;

export default function init(db1) {
  db = db1;
}

export function readTrenesPorEstacion(idEstacion) {
  return db.query(
    `
SELECT
  idItinerario,
  nombre,
  llega,
  sale,
  idTren,
  fecha,
  numero,
  chapa
FROM
  Itinerarios
JOIN
  Escalas USING(idItinerario)
JOIN
  Trenes USING(idItinerario)
WHERE
  idEstacion = ?
ORDER BY
  idItinerario,
  llega`,
    idEstacion,
  );
}
