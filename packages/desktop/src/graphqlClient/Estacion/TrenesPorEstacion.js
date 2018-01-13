import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import TrenesPorEstacion from '_components/Estacion/TrenesPorEstacion';

export default graphql(
  gql`
    query {
      trenes(idEstacion: "RET") {
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
  /*
  {
    "idTren": "10",
    "itinerario": {
      "nombre": "Retiro-Rosario"
    },
    "fecha": 1475763300000,
    "chapa": 12,
    "numero": 507
  }      */
  {
    props: ({ data }) => ({
      ...data,
      ...data.itinerario,
    }),
  },
)(TrenesPorEstacion);
