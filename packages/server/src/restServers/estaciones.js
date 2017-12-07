import { join } from 'path';
import { readEstaciones, verificarEstacionExiste, updateEstacion } from '../dbOps';

export default async function (dataRouter, path) {
  const relPath = extra => join(path, extra);

  dataRouter.get(relPath('/'), async (req, res) => {
    const resp = await readEstaciones();
    res.json(resp);
  });

  dataRouter.get(relPath('/exists/:nombre'), async (req, res) => {
    const resp = await verificarEstacionExiste(req.query.id, req.params.nombre);
    res.json(resp);
  });

  dataRouter.post(relPath(':id'), async (req, res) => {
    const resp = await updateEstacion({ ...req.body, id: req.params.id });
    res.json(resp);
  });
}
