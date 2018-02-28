// @flow
import connect from '_connectors/utils/connect';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import EditEstacion from '_components/EditEstacion';
import estacionesStore from '_store/estaciones';

export const init = (
  estaciones: estacionesStore,
  { match }: { match: Match },
) => {
  const idEstacion = match && match.params.idEstacion;
  if (!idEstacion) return true; // go ahead, render the empty form
  if (estaciones.selEstacion(idEstacion)) return true;
  return estaciones.getEstacion(idEstacion);
};

export const mapProps = (
  estaciones: estacionesStore,
  { match }: { match: Match },
) => {
  const idEstacion = match && match.params.idEstacion;
  return {
    estacion: estaciones.selEstacion(idEstacion),
    onSave: (nueva: boolean, estacion: Estacion) => {
      if (nueva) {
        return estaciones.createEstacion(estacion);
      }
      return estaciones.updateEstacion(estacion);
    },
    existeEstacion: (idEstacion: IdEstacion) =>
      estaciones.existeEstacion(idEstacion),
  };
};

export default compose(withRouter, connect(estacionesStore, mapProps, init))(
  EditEstacion,
);
