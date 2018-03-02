// @flow
import connect from '_connectors/utils/connect';
import type { MapProps, Init } from '_connectors/utils/connect';

import TrenesPorEstacion from '_components/Estacion/TrenesPorEstacion';
import estacionesStore from '_store/estaciones';

export const init: Init<estacionesStore> = (
  estaciones,
  { idEstacion }: { idEstacion: IdEstacion },
) => {
  if (!estaciones.selTrenesPorEstacion(idEstacion))
    return estaciones.getTrenesEstacion(idEstacion);
};

export const mapProps: MapProps<estacionesStore> = (
  estaciones,
  { idEstacion }: { idEstacion: IdEstacion },
) => ({
  trenes: estaciones.selTrenesPorEstacion(idEstacion),
});

export default connect(estacionesStore, mapProps, init)(TrenesPorEstacion);
