// @flow
import connect from '_connectors/utils/connect';
import type { MapProps, Init } from '_connectors/utils/connect';

import TrenesPorEstacion from '_components/Estacion/TrenesPorEstacion';
import estacionesStore from '_store/estaciones';
import trenesStore from '_store/trenes';

export const init: Init<estacionesStore> = (
  estaciones,
  trenes,
  { idEstacion }: { idEstacion: IdEstacion },
) => {
  if (!estaciones.selTrenesPorEstacion(idEstacion))
    return estaciones.getTrenesEstacion(idEstacion).then(trenes.loadTrenes);
};

export const mapProps: MapProps<estacionesStore> = (
  estaciones,
  trenes,
  { idEstacion }: { idEstacion: IdEstacion },
) => ({
  trenes: (estaciones.selTrenesPorEstacion(idEstacion) || []).map(idTren =>
    trenes.selTren(idTren),
  ),
});

export default connect([estacionesStore, trenesStore], mapProps, init)(
  TrenesPorEstacion,
);
