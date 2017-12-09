let db;

export function init(db1) {
  db = db1;
}

export function readEstaciones() {
  return db.query('select * from Estaciones order by nombre');
}

export async function existeEstacionPorNombre(nombre) {
  const result = await db.query('select count(*) as hay from Estaciones where nombre = ?', [nombre]);
  return {
    success: result[0].hay === 1
  };
}

export async function existeEstacionPorSigla(sigla) {
  const result = await db.query('select count(*) as hay from Estaciones where sigla = ?', [sigla]);
  return {
    success: result[0].hay === 1
  };
}

export async function updateEstacion(id, data) {
  const result = await db.query('update Estaciones set ? where idEstacion = ?', [data, id]);
  return {
    success: result.affectedRows === 1
  }
}

export async function readEstacion(id) {
  const result = await db.query('select * from Estaciones where idEstacion = ?', [id]);
  return result[0];
}

export async function readEstacionPorNombre(nombre) {
  const result = await db.query('select * from Estaciones where nombre = ?', [nombre]);
  return result[0];
}

export async function readEstacionPorSigla(sigla) {
  const result = await db.query('select * from Estaciones where sigla = ?', [sigla]);
  return result[0];
}

export async function createEstacion(data) {
  try {
    const result = await db.query('insert into Estaciones set ?', data);
    return {
      success: true,
      idEstacion: result.insertId
    };
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return {
        success: false
      }
    }
    throw err;
  }
};

export async function deleteEstacion(id) {
  const result = await db.query('delete from Estaciones where idEstacion = ?', [id]);
  return {
    success: result.affectedRows === 1
  }
}
