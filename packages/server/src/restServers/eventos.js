import join from './plainJoin';
import { eventosPorTren, eventosPorEstacion } from '../dbOps/eventos';

export default async function(dataRouter, path) {
  const relPath = extra => join(path, extra);

  dataRouter.get(relPath('/tren/:idTren'), async (req, res) => {
    const resp = await eventosPorTren(parseInt(req.params.idTren, 10));
    res.json(resp);
  });
  dataRouter.get(relPath('/estacion/:idEstacion'), async (req, res) => {
    const resp = await eventosPorEstacion(req.params.idEstacion);
    res.json(resp);
  });
}
