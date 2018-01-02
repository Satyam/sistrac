import { connect } from 'react-redux';
import { compose } from 'recompose';

import initStore from '_connectors/utils/initStore';

import { loadTiposEventos, loadTiposEmergencias } from '_store/actions';
import { selTiposEventos, selTiposEmergencias } from '_store/selectors';

import Tipos from '_components/Estacion/EventosEstacion';

export const storeInitializer = dispatch => {
  return Promise.all([
    dispatch(loadTiposEventos()),
    dispatch(loadTiposEmergencias()),
  ]);
};

export const mapStateToProps = state => ({
  eventos: selTiposEventos(state),
  emergencias: selTiposEmergencias(state),
});

export default compose(initStore(storeInitializer), connect(mapStateToProps))(
  Tipos,
);
