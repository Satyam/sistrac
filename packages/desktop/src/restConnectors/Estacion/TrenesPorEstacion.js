import { connect } from 'react-redux';
import { compose } from 'recompose';

import initStore from '_connectors/utils/initStore';

import { getTrenesEstacion } from '_store/actions';
import { selEstacion, selTrenesPorEstacion } from '_store/selectors';

import TrenesPorEstacion from '_components/Estacion/TrenesPorEstacion';

export const storeInitializer = (dispatch, getState, { idEstacion }) => {
  const estacion = selEstacion(getState(), idEstacion);
  if (!!estacion && !estacion.trenes)
    return dispatch(getTrenesEstacion(idEstacion));
};

export const mapStateToProps = (state, { idEstacion }) => {
  return { trenes: selTrenesPorEstacion(state, idEstacion) };
};

export default compose(initStore(storeInitializer), connect(mapStateToProps))(
  TrenesPorEstacion,
);
