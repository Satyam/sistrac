import join from './plainJoin';
import {
  readEstaciones,
  existeEstacionPorNombre,
  existeEstacionPorSigla,
  updateEstacion,
  readEstacion,
  readEstacionPorNombre,
  readEstacionPorSigla,
  createEstacion,
  deleteEstacion,
  readEscalasPorIdEstacion,
} from '../dbOps/estaciones';

import {
  OK,
  CREATED,
  NOT_FOUND,
  NO_CONTENT,
  CONFLICT,
} from './httpStatusCodes';

export default async function(dataRouter, path) {
  const relPath = extra => join(path, extra);

  dataRouter.get(relPath('/'), async (req, res) => {
    const resp = await readEstaciones();
    res.json(resp);
  });

  dataRouter.get(relPath('/:idEstacion'), async (req, res) => {
    const resp = await readEstacion(parseInt(req.params.idEstacion, 10));
    if (resp) res.json(resp);
    else res.status(NOT_FOUND).end();
  });

  dataRouter.get(relPath('/nombre/:nombre'), async (req, res) => {
    const resp = await readEstacionPorNombre(req.params.nombre);
    if (resp) res.json(resp);
    else res.status(NOT_FOUND).end();
  });

  dataRouter.get(relPath('/sigla/:sigla'), async (req, res) => {
    const resp = await readEstacionPorSigla(req.params.sigla);
    if (resp) res.json(resp);
    else res.status(NOT_FOUND).end();
  });

  dataRouter.get(relPath('/existe/nombre/:nombre'), async (req, res) => {
    const resp = await existeEstacionPorNombre(req.params.nombre);
    res.status(resp ? OK : NOT_FOUND).end();
  });

  dataRouter.get(relPath('/existe/sigla/:sigla'), async (req, res) => {
    const resp = await existeEstacionPorSigla(req.params.sigla);
    res.status(resp ? OK : NOT_FOUND).end();
  });

  dataRouter.put(relPath('/:idEstacion'), async (req, res) => {
    const resp = await updateEstacion(
      parseInt(req.params.idEstacion, 10),
      req.body,
    );
    res.status(resp ? NO_CONTENT : NOT_FOUND).end();
  });

  dataRouter.post(relPath('/'), async (req, res) => {
    const resp = await createEstacion(req.body);
    if (resp) res.status(CREATED).json({ idEstacion: resp });
    else res.status(CONFLICT).end();
  });

  dataRouter.delete(relPath('/:idEstacion'), async (req, res) => {
    const resp = await deleteEstacion(parseInt(req.params.idEstacion, 10));
    res.status(resp ? NO_CONTENT : NOT_FOUND).end();
  });

  dataRouter.get(relPath('/itinerarios/:idEstacion'), async (req, res) => {
    const resp = await readEscalasPorIdEstacion(
      parseInt(req.params.idEstacion, 10),
    );
    res.json(resp);
  });
}
