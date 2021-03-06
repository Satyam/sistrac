import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Estacion from '_components/Estacion';

export default compose(
  withRouter,
  graphql(
    gql`
      query($idEstacion: ID!) {
        estacion(idEstacion: $idEstacion) {
          idEstacion
          nombre
          latitud
          longitud
        }
      }
    `,
    {
      props: result => result.data,
      options: props => ({
        variables: {
          idEstacion: props.match.params.idEstacion,
        },
      }),
    },
  ),
)(Estacion);
