import join from './plainJoin';
import { readTiposEventos, readTiposEmergencias } from '../dbOps/tipos';

export default async function(dataRouter, path) {
  const relPath = extra => join(path, extra);

  dataRouter.get(relPath('/eventos'), async (req, res) => {
    const resp = await readTiposEventos();
    res.json(resp);
  });

  dataRouter.get(relPath('/emergencias'), async (req, res) => {
    const resp = await readTiposEmergencias();
    res.json(resp);
  });
}
