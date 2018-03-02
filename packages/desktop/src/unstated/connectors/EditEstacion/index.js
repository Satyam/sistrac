// @flow
import connect from '_connectors/utils/connect';
import type { MapProps, Init } from '_connectors/utils/connect';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import EditEstacion from '_components/EditEstacion';
import estacionesStore from '_store/estaciones';
import type { Match } from 'react-router-dom';

export const init: Init<estacionesStore> = (
  estaciones,
  { match }: { match?: Match },
) => {
  const idEstacion: ?IdEstacion = match && match.params.idEstacion;
  if (!idEstacion) return true; // go ahead, render the empty form
  if (estaciones.selEstacion(idEstacion)) return true;
  return estaciones.getEstacion(idEstacion);
};

export const mapProps: MapProps<estacionesStore> = (
  estaciones,
  { match }: { match?: Match },
) => {
  const idEstacion: ?IdEstacion = match && match.params.idEstacion;
  return {
    estacion: idEstacion && estaciones.selEstacion(idEstacion),
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
