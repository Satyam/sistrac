// @flow
import connect from '_connectors/utils/connect';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Estacion from '_components/Estacion';
import estacionesStore from '_store/estaciones';

export const init = (
  estaciones: estacionesStore,
  { match }: { match: Match },
) => {
  const idEstacion = match && match.params.idEstacion;
  if (idEstacion) {
    return (
      estaciones.selEstacion(idEstacion) || estaciones.getEstacion(idEstacion)
    );
  }
};

export const mapProps = (
  estaciones: estacionesStore,
  { match }: { match: Match },
) =>
  match
    ? {
        estacion: estaciones.selEstacion(match.params.idEstacion),
      }
    : {};

export default compose(withRouter, connect(estacionesStore, mapProps, init))(
  Estacion,
);
