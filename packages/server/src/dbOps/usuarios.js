let db;

export function init(db1) {
  db = db1;
}

export async function createUsuario(values) {
  const query = await db.query('insert into Usuarios SET ?', values);
  return { id: query.insertId};
}

export async function readUsuario(Usuario) {
  const query = await db.query('select * from Usuarios where usuario = ?', [Usuario]);
  return query[0];
}

export async function  deleteUsuario(Usuario) {
  const query = await db.query('delete from Usuarios where usuario = ?', [Usuario]);
  return { affected: query.affectedRows};
}

export async function updateUsuario(id, datos) {
  const query = await db.query('update Usuarios set ? where idUsuario = ?', [datos, id]);
  return { affected: query.affectedRows};
}
