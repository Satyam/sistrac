import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import initStore from '_connectors/utils/initStore';

import { getEstacion } from '_store/actions';
import { selEstacion } from '_store/selectors';

import Estacion from '_components/Estacion';

export const storeInitializer = (dispatch, getState, { match }) => {
  const idEstacion = match && match.params.idEstacion;
  return (
    !!idEstacion &&
    (selEstacion(getState(), idEstacion) || dispatch(getEstacion(idEstacion)))
  );
};

export const mapStateToProps = (state, { match }) =>
  match
    ? {
        estacion: selEstacion(state, match.params.idEstacion),
      }
    : {};

export default compose(
  withRouter,
  initStore(storeInitializer),
  connect(mapStateToProps),
)(Estacion);
