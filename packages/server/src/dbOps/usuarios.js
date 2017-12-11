let db;

export function init(db1) {
  db = db1;
}

function convertToBoolean(row) {
  return (
    (row || false) && {
      ...row,
      rolGuarda: !!row.rolGuarda,
      rolDios: !!row.rolDios,
      rolSupervisor: !!row.rolSupervisor,
      rolMecanico: !!row.rolMecanico,
    }
  );
}
export async function readUsuarios() {
  const query = await db.query('select * from Usuarios');
  return query.map(convertToBoolean);
}

export async function createUsuario(values) {
  try {
    const query = await db.query('insert into Usuarios set ?', values);
    return query.insertId;
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return false;
    }
    throw err;
  }
}

export async function readUsuario(id) {
  const query = await db.query('select * from Usuarios where idUsuario = ?', [
    id,
  ]);
  return convertToBoolean(query[0]);
}

export async function readUsuarioPorUsuario(usuario) {
  const query = await db.query('select * from Usuarios where usuario = ?', [
    usuario,
  ]);
  return convertToBoolean(query[0]);
}

export async function deleteUsuario(id) {
  const query = await db.query('delete from Usuarios where idUsuario = ?', [
    id,
  ]);
  return query.affectedRows === 1;
}

export async function updateUsuario(id, datos) {
  const query = await db.query('update Usuarios set ? where idUsuario = ?', [
    datos,
    id,
  ]);
  return query.affectedRows === 1;
}
