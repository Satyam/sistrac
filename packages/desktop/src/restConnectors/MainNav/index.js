import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { selUsuarioActivo, selStatusUsuario } from '_store/selectors';

import MainNav from '_components/MainNav';

export const mapStateToProps = state => ({
  usuario: selUsuarioActivo(state),
  statusUsuario: selStatusUsuario(state),
});

export default compose(withRouter, connect(mapStateToProps))(MainNav);
