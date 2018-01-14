import join from '../utils/plainJoin';
import { readEventosPorTren, readEventosPorEstacion } from '../dbOps/eventos';

export default async function(dataRouter, path) {
  const relPath = extra => join(path, extra);

  dataRouter.get(relPath('/tren/:idTren'), async (req, res) => {
    const resp = await readEventosPorTren(parseInt(req.params.idTren, 10));
    res.json(resp);
  });
  dataRouter.get(relPath('/estacion/:idEstacion'), async (req, res) => {
    const resp = await readEventosPorEstacion(req.params.idEstacion);
    res.json(resp);
  });
}
