import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import initStore from '_connectors/utils/initStore';

import { getEstacion, createEstacion, updateEstacion } from '_store/actions';
import { selEstacion } from '_store/selectors';

import EditEstacion from '_components/EditEstacion';

export const storeInitializer = (dispatch, getState, { match }) => {
  const idEstacion = match && match.params.idEstacion;
  if (!idEstacion) return true; // go ahead, render the empty form
  if (selEstacion(getState(), idEstacion)) return true;
  return dispatch(getEstacion(idEstacion));
};

export const mapStateToProps = (state, { match }) => {
  const idEstacion = match && match.params.idEstacion;
  const estacion = selEstacion(state, idEstacion);
  if (estacion) return { estacion };
  return {};
};
export const mapDispatchToProps = (dispatch, { history }) => ({
  onSave: async ({ add, ...estacion }) => {
    if (add) {
      return dispatch(createEstacion(estacion));
    }
    const { idEstacion, ...data } = estacion;
    return dispatch(updateEstacion(idEstacion, data));
  },
});

export default compose(
  withRouter,
  initStore(storeInitializer),
  connect(mapStateToProps, mapDispatchToProps),
)(EditEstacion);
