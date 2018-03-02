// @flow
import connect from '_connectors/utils/connect';
import type { MapProps, Init } from '_connectors/utils/connect';

import Estaciones from '_components/Estaciones';
import estacionesStore from '_store/estaciones';

export const mapProps: MapProps<estacionesStore> = estaciones => ({
  estaciones: estaciones.selEstaciones(),
  deleteEstacion: (idEstacion: IdEstacion) =>
    estaciones.deleteEstacion(idEstacion),
});

export const init: Init<estacionesStore> = estaciones =>
  estaciones.getEstaciones();

export default connect(estacionesStore, mapProps, init)(Estaciones);
