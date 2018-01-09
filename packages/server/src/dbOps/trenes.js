let db;

export default function init(db1) {
  db = db1;
}

export function readTrenesPorItinerario(idItinerario) {
  return db.query(
    `
    SELECT
      idItinerario,
      idEstacion,
      nombre,
      llega,
      sale,
      idTren,
      fecha,
      numero,
      chapa
    FROM
      Escalas
    JOIN
      Estaciones USING(idEstacion)
    JOIN
      Trenes USING(idItinerario)
    WHERE
      idItinerario = ?
    ORDER BY
      idItinerario,
      llega`,
    idItinerario,
  );
}

export function readTren(idTren) {
  return db.query('select * from Trenes where idTren = ?', [idTren]);
}
