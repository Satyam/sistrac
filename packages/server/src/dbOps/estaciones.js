let db;

export function init(db1) {
  db = db1;
}

export function readEstaciones() {
  return db.query('SELECT * FROM Estaciones ORDER BY nombre');
}

export async function verificarEstacionExiste(nombre) {
  const result = await db.query('SELECT COUNT(*) AS hay FROM Estaciones WHERE nombre = ?', [nombre]);
  return result[0];
}

export async function updateEstacion(id, data) {
  const result = await db.query('update Estaciones set ? where idEstacion = ?', [data, id]);
  return {
    affected: result.affectedRows
  }
}

export async function readEstacion(id) {
  const result = await db.query('SELECT * FROM Estaciones WHERE idEstacion = ?', [id]);
  return result[0];
}

export async function insertEstacion(data) {
  const result = await db.query('insert into Estaciones set ?', data);
  return {
    idEstacion: result.insertId
  };
};

export async function deleteEstacion(id) {
  const result = await db.query('delete from Estaciones where idEstacion = ?', [id]);
  return {
    affected: result.affectedRows
  }
}
