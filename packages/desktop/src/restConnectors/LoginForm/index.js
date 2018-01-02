import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { login } from '_store/actions';
import { selUsuarioActivo } from '_store/selectors';

import LoginForm from '_components/LoginForm';

export const mapStateToProps = state => ({ usuario: selUsuarioActivo(state) });

export const mapDispatchToProps = (dispatch, { history }) => ({
  onLogin: async (username, password) => {
    await dispatch(login(username, password));
    await history.goBack();
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(LoginForm);
