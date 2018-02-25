import connect from '_connectors/utils/connect';

import TrenesPorEstacion from '_components/Estacion/TrenesPorEstacion';
import estacionesStore from '_store/estaciones';

export const init = (estaciones, { idEstacion }) => {
  if (!estaciones.selTrenesPorEstacion(idEstacion))
    return estaciones.getTrenesEstacion(idEstacion);
};

export const mapProps = (estaciones, { idEstacion }) => ({
  trenes: estaciones.selTrenesPorEstacion(idEstacion),
});

export default connect(estacionesStore, mapProps, init)(TrenesPorEstacion);
