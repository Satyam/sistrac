import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';

import App from '_components/App';

export default compose(
  withRouter,
  withProps({
    statusUsuario: 2,
    usuario: {
      idUsuario: 10,
      usuario: 'satyam',
      nombre: 'Daniel Barreiro',
      nivel: 1,
      rolDios: true,
      rolGuarda: true,
      rolMecanico: true,
      rolSupervisor: true,
      funcion: 0,
    },
  }),
)(App);
