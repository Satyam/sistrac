import { join } from 'path';
import {
  readEstaciones,
  existeEstacionPorNombre,
  existeEstacionPorSigla,
  updateEstacion,
  readEstacion,
  readEstacionPorNombre,
  readEstacionPorSigla,
  createEstacion,
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

  dataRouter.get(relPath('/nombre/:nombre'), async (req, res) => {
    const resp = await readEstacionPorNombre(req.params.nombre);
    res.json(resp);
  });

  dataRouter.get(relPath('/sigla/:sigla'), async (req, res) => {
    const resp = await readEstacionPorSigla(req.params.sigla);
    res.json(resp);
  });

  dataRouter.get(relPath('/existe/nombre/:nombre'), async (req, res) => {
    const resp = await existeEstacionPorNombre(req.params.nombre);
    res.json(resp);
  });

  dataRouter.get(relPath('/existe/sigla/:sigla'), async (req, res) => {
    const resp = await existeEstacionPorSigla(req.params.sigla);
    res.json(resp);
  });

  dataRouter.put(relPath('/:idEstacion'), async (req, res) => {
    const resp = await updateEstacion(req.params.idEstacion, req.body);
    res.json(resp);
  });

  dataRouter.post(relPath('/'), async (req, res) => {
    const resp = await createEstacion(req.body);
    res.json(resp);
  });
}
