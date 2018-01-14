import join from '../utils/plainJoin';
import { readTrenesPorEstacion } from '../dbOps/trenes';

export default async function(dataRouter, path) {
  const relPath = extra => join(path, extra);

  dataRouter.get(relPath('/estacion/:idEstacion'), async (req, res) => {
    const resp = await readTrenesPorEstacion(req.params.idEstacion);
    res.json(resp);
  });
}
