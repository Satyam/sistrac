import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Estaciones from '_components/Estaciones';

export default graphql(
  gql`
    query {
      estaciones {
        idEstacion
        nombre
        latitud
        longitud
      }
    }
  `,
  { props: result => result.data },
)(Estaciones);
