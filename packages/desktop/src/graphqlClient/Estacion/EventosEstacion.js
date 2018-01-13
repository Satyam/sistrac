import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Eventos from '_components/Estacion/EventosEstacion';

export default graphql(
  gql`
    query {
      eventos(idEstacion: "RET") {
        idEvento
        fecha
        usuario {
          nombre
          idUsuario
        }
        observaciones
        tren {
          idTren
          numero
        }
        velocidad
        tipoEvento {
          descr
          preposicion
        }
        tipoEmergencia {
          descr
        }
      }
    }
  `,
  /*
  {
        "idEvento": "39",
        "fecha": 1475770418000,
        "usuario": {
          "nombre": "Juan Pérez",
          "idUsuario": "2"
        },
        "observaciones": "Salimos de Retiro",
        "tren": {
          "idTren": "10",
          "numero": 507
        },
        "velocidad": 0,
        "tipoEvento": {
          "descr": "Sale de terminal",
          "preposicion": "de"
        },
        "tipoEmergencia": {
          "descr": "Problemas de salud con pasajero"
        }
      }
      */
  {
    props: ({ data }) => ({
      ...data,
      usuario: data.usuario.nombre,
      idUsuario: data.usuario.idUsuario,
      descrEvento: data.tipoEvento.descr,
      idTren: data.tren.idTren,
      numeroTren: data.tren.numero,
      descrEmergencia: data.tipoEmergencia.descr,
    }),
  },
)(Eventos);
