import LoginForm from '_components/LoginForm';
import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';

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
)(LoginForm);
