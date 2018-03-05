import { connect } from 'react-redux';
import { compose } from 'recompose';

import initStore from '_connectors/utils/initStore';

import {
  loadTiposEventos,
  loadTiposEmergencias,
  getEventosPorEstacion,
  getUsuarios,
} from '_store/actions';

import {
  selEventosPorEstacion,
  selDescrEvento,
  selDescrEmergencia,
  selUsuario,
} from '_store/selectors';

import Eventos from '_components/Estacion/EventosEstacion';

export const storeInitializer = (dispatch, getState, { idEstacion }, prev) =>
  Promise.all([
    selEventosPorEstacion(getState(), idEstacion).length ||
      dispatch(getEventosPorEstacion(idEstacion)).then(action =>
        dispatch(getUsuarios(action.payload.map(evento => evento.idUsuario))),
      ),
    dispatch(loadTiposEventos()),
    dispatch(loadTiposEmergencias()),
  ]);

export const mapStateToProps = (state, { idEstacion }) => {
  const eventos = selEventosPorEstacion(state, idEstacion);
  return {
    eventos: eventos.map(evento => ({
      ...evento,
      descrEvento: selDescrEvento(state, evento.idTipoEvento),
      descrEmergencia: selDescrEmergencia(state, evento.idTipoEmergencia),
      numeroTren: evento.idTren,
      usuario: (selUsuario(state, evento.idUsuario) || {}).nombre,
    })),
  };
};

export default compose(initStore(storeInitializer), connect(mapStateToProps))(
  Eventos,
);
