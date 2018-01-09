let db;

export default function init(db1) {
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
export async function readUsuarios(idUsuarios) {
  const where = idUsuarios ? 'where idUsuario in (?)' : '';
  const query = await db.query(`select * from UsuariosSimple ${where}`, [
    idUsuarios,
  ]);
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
  return convertToBoolean(
    await db.queryRow('select * from UsuariosSimple where idUsuario = ?', [id]),
  );
}

export async function readUsuarioPorUsuario(usuario) {
  return convertToBoolean(
    await db.queryRow('select * from UsuariosSimple where usuario = ?', [
      usuario,
    ]),
  );
}

export async function loginUsuario(usuario, password) {
  return convertToBoolean(
    await db.queryRow(
      `select idUsuario, usuario, nombre, nivel, 
    rolDios, rolGuarda, rolMecanico, rolSupervisor, funcion 
    from Usuarios where usuario = ? and password = ?`,
      [usuario, password],
    ),
  );
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
