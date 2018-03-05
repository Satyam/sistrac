import join from '../utils/plainJoin';
import {
  readEstaciones,
  existeEstacionPorNombre,
  existeEstacion,
  updateEstacion,
  readEstacion,
  readEstacionPorNombre,
  createEstacion,
  deleteEstacion,
  readBreveTrenesPorEstacion,
  readEventosPorEstacion
} from '../dbOps/estaciones';

import {
  OK,
  CREATED,
  NOT_FOUND,
  NO_CONTENT,
  CONFLICT
} from '../utils/httpStatusCodes';

export default async function(dataRouter, path) {
  const relPath = extra => join(path, extra);

  dataRouter.get(relPath('/'), async (req, res) => {
    const resp = await readEstaciones();
    res.json(resp);
  });

  dataRouter.get(relPath('/:idEstacion'), async (req, res) => {
    const resp = await readEstacion(req.params.idEstacion);
    if (resp) res.json(resp);
    else res.status(NOT_FOUND).end();
  });

  dataRouter.get(relPath('/nombre/:nombre'), async (req, res) => {
    const resp = await readEstacionPorNombre(req.params.nombre);
    if (resp) res.json(resp);
    else res.status(NOT_FOUND).end();
  });

  dataRouter.get(relPath('/existe/nombre/:nombre'), async (req, res) => {
    const resp = await existeEstacionPorNombre(req.params.nombre);
    res.status(resp ? OK : NOT_FOUND).end();
  });

  dataRouter.get(relPath('/existe/:idEstacion'), async (req, res) => {
    const resp = await existeEstacion(req.params.idEstacion);
    res.status(resp ? OK : NOT_FOUND).end();
  });

  dataRouter.put(relPath('/:idEstacion'), async (req, res) => {
    const resp = await updateEstacion(req.params.idEstacion, req.body);
    res.status(resp ? NO_CONTENT : NOT_FOUND).end();
  });

  dataRouter.post(relPath('/'), async (req, res) => {
    const resp = await createEstacion(req.body);
    if (resp) res.status(CREATED).end();
    else res.status(CONFLICT).end();
  });

  dataRouter.delete(relPath('/:idEstacion'), async (req, res) => {
    const resp = await deleteEstacion(req.params.idEstacion);
    res.status(resp ? NO_CONTENT : NOT_FOUND).end();
  });

  dataRouter.get(relPath('/trenes/:idEstacion'), async (req, res) => {
    const resp = await readBreveTrenesPorEstacion(req.params.idEstacion);
    res.json(resp);
  });
  dataRouter.get(relPath('/eventos/:idEstacion'), async (req, res) => {
    const resp = await readEventosPorEstacion(req.params.idEstacion);
    res.json(resp);
  });
}
