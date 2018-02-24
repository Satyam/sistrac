import connect from '_connectors/utils/connect';

import Estaciones from '_components/Estaciones';
import estacionesStore from '_store/estaciones';

export const mapProps = estaciones => ({
  estaciones: estaciones.selEstaciones(),
  deleteEstacion: idEstacion => estaciones.deleteEstacion(idEstacion),
});

export const init = estaciones => estaciones.getEstaciones();

export default connect(estacionesStore, mapProps, init)(Estaciones);
