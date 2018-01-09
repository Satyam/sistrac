let db;

export default function init(db1) {
  db = db1;
}

export function readEstaciones() {
  return db.query('select * from Estaciones order by nombre');
}

export async function existeEstacionPorNombre(nombre) {
  const result = await db.queryRow(
    'select count(*) as hay from Estaciones where nombre = ?',
    [nombre],
  );
  return result.hay === 1;
}

export async function existeEstacion(idEstacion) {
  const result = await db.queryRow(
    'select count(*) as hay from Estaciones where idEstacion = ?',
    [idEstacion],
  );
  return result.hay === 1;
}

export async function updateEstacion(idEstacion, data) {
  const result = await db.query(
    'update Estaciones set ? where idEstacion = ?',
    [data, idEstacion],
  );
  return result.affectedRows === 1;
}

export function readEstacion(idEstacion) {
  return db.queryRow('select * from Estaciones where idEstacion = ?', [
    idEstacion,
  ]);
}

export function readEstacionPorNombre(nombre) {
  return db.queryRow('select * from Estaciones where nombre = ?', [nombre]);
}

export async function createEstacion(data) {
  try {
    const resp = await db.query('insert into Estaciones set ?', data);
    return resp.insertId > 0;
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
