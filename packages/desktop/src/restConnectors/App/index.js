import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { selUsuarioActivo, selStatusUsuario } from '_store/selectors';
import { logout, getUsuarioActual } from '_store/actions';

import App from '_components/App';

export const mapStateToProps = state => ({
  usuario: selUsuarioActivo(state),
  statusUsuario: selStatusUsuario(state),
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  logout: async () => {
    await dispatch(logout());
    await history.replace('/');
    return null;
  },
  getUsuarioActual: async () => await dispatch(getUsuarioActual()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
