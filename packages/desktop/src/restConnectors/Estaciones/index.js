import { connect } from 'react-redux';
import { compose } from 'recompose';
import initStore from '_connectors/utils/initStore';
import { getEstaciones } from '_store/actions';
import { selEstaciones } from '_store/selectors';

import Estaciones from '_components/Estaciones';

export const storeInitializer = (dispatch, getState) =>
  selEstaciones(getState()).length || dispatch(getEstaciones());

export const mapStateToProps = state => ({ estaciones: selEstaciones(state) });

export default compose(initStore(storeInitializer), connect(mapStateToProps))(
  Estaciones,
);
