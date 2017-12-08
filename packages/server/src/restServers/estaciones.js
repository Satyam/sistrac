import { join } from 'path';
import {
  readEstaciones,
  verificarEstacionExiste,
  updateEstacion,
  readEstacion,
  insertEstacion,
} from '../dbOps';

export default async function (dataRouter, path) {
  const relPath = extra => join(path, extra);

  dataRouter.get(relPath('/'), async (req, res) => {
    const resp = await readEstaciones();
    res.json(resp);
  });
  dataRouter.get(relPath('/:idEstacion'), async (req, res) => {
    const resp = await readEstacion(req.params.idEstacion);
    res.json(resp);
  });

  dataRouter.get(relPath('/exists/:nombre'), async (req, res) => {
    const resp = await verificarEstacionExiste(req.params.nombre);
    res.json(resp);
  });

  dataRouter.put(relPath(':idEstacion'), async (req, res) => {
    const resp = await updateEstacion(req.params.idEstacion, req.body);
    res.json(resp);
  });
  dataRouter.post(relPath('/'), async (req, res) => {
    const resp = await insertEstacion(req.body);
    res.json(resp);
  });
}
