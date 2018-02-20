import { connect } from 'react-redux';
import { compose } from 'recompose';
import initStore from '_connectors/utils/initStore';
import { getEstaciones, deleteEstacion } from '_store/actions';
import { selEstaciones } from '_store/selectors';

import Estaciones from '_components/Estaciones';

export const storeInitializer = (dispatch, getState) =>
  dispatch(getEstaciones());

export const mapStateToProps = state => ({ estaciones: selEstaciones(state) });

export const mapDispatchToProps = dispatch => ({
  deleteEstacion: idEstacion => dispatch(deleteEstacion(idEstacion)),
});
export default compose(
  initStore(storeInitializer),
  connect(mapStateToProps, mapDispatchToProps),
)(Estaciones);
