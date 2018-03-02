// @flow
import connect from '_connectors/utils/connect';
import type { MapProps, Init } from '_connectors/utils/connect';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Estacion from '_components/Estacion';
import estacionesStore from '_store/estaciones';
import type { Match } from 'react-router-dom';
export const init: Init<estacionesStore> = (
  estaciones,
  { match }: { match?: Match },
) => {
  const idEstacion: ?IdEstacion = match && match.params.idEstacion;
  if (idEstacion) {
    return (
      estaciones.selEstacion(idEstacion) || estaciones.getEstacion(idEstacion)
    );
  }
};

export const mapProps: MapProps<estacionesStore> = (
  estaciones,
  { match }: { match?: Match },
) => {
  const idEstacion: ?IdEstacion = match && match.params.idEstacion;

  return idEstacion
    ? {
        estacion: estaciones.selEstacion(idEstacion),
      }
    : {};
};
export default compose(withRouter, connect(estacionesStore, mapProps, init))(
  Estacion,
);
