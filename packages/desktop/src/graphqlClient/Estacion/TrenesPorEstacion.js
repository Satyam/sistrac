import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import TrenesPorEstacion from '_components/Estacion/TrenesPorEstacion';

export default graphql(
  gql`
    query($idEstacion: ID!) {
      trenes(idEstacion: $idEstacion) {
        idTren
        itinerario {
          idItinerario
          nombre
        }
        fecha
        chapa
        numero
      }
    }
  `,
  {
    props: ({ data }) => ({
      trenes: (data.trenes || []).map(tren => ({
        ...tren,
        fecha: new Date(tren.fecha),
        ...tren.itinerario,
      })),
    }),
    options: props => ({
      variables: {
        idEstacion: props.idEstacion,
      },
    }),
  },
)(TrenesPorEstacion);
