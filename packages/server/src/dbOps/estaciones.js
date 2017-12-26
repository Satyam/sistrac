let db;

export function init(db1) {
  db = db1;
}

export function readEstaciones() {
  return db.query('select * from Estaciones order by nombre');
}

export async function existeEstacionPorNombre(nombre) {
  const result = await db.query(
    'select count(*) as hay from Estaciones where nombre = ?',
    [nombre],
  );
  return result[0].hay === 1;
}

export async function existeEstacion(idEstacion) {
  const result = await db.query(
    'select count(*) as hay from Estaciones where idEstacion = ?',
    [idEstacion],
  );
  return result[0].hay === 1;
}

export async function updateEstacion(idEstacion, data) {
  const result = await db.query(
    'update Estaciones set ? where idEstacion = ?',
    [data, idEstacion],
  );
  return result.affectedRows === 1;
}

export async function readEstacion(idEstacion) {
  const result = await db.query(
    'select * from Estaciones where idEstacion = ?',
    [idEstacion],
  );
  return result[0];
}

export async function readEstacionPorNombre(nombre) {
  const result = await db.query('select * from Estaciones where nombre = ?', [
    nombre,
  ]);
  return result[0];
}

export async function createEstacion(data) {
  try {
    const result = await db.query('insert into Estaciones set ?', data);
    return result.insertId;
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return false;
    }
    throw err;
  }
}

export async function deleteEstacion(idEstacion) {
  const result = await db.query('delete from Estaciones where idEstacion = ?', [
    idEstacion,
  ]);
  return result.affectedRows === 1;
}

export function readTrenesPorEstacion(idEstacion) {
  return db.query(
    `SELECT
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
// SELECT nombre, llega, sale, Trenes.* FROM Itinerarios JOIN Escalas USING(idItinerario) JOIN Trenes USING(idItinerario) WHERE idEstacion = 'SPD' ORDER BY idItinerario, llega

