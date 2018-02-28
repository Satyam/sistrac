// @flow
import connect from '_connectors/utils/connect';

import Estaciones from '_components/Estaciones';
import estacionesStore from '_store/estaciones';

export const mapProps = (estaciones: estacionesStore) => ({
  estaciones: estaciones.selEstaciones(),
  deleteEstacion: (idEstacion: IdEstacion) =>
    estaciones.deleteEstacion(idEstacion),
});

export const init = (estaciones: estacionesStore) => estaciones.getEstaciones();

export default connect(estacionesStore, mapProps, init)(Estaciones);
