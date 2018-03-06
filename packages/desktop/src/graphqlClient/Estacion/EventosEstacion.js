import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Eventos from '_components/Estacion/EventosEstacion';

export default graphql(
  gql`
    query($idEstacion: ID!) {
      eventos(idEstacion: $idEstacion) {
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
  {
    props: ({ data }) => ({
      eventos: (data.eventos || []).map(evento => ({
        ...evento,
        fecha: new Date(evento.fecha),
        usuario: evento.usuario.nombre,
        idUsuario: evento.usuario.idUsuario,
        descrEvento: evento.tipoEvento.descr,
        idTren: evento.tren.idTren,
        numeroTren: evento.tren.numero,
        descrEmergencia: evento.tipoEmergencia && evento.tipoEmergencia.descr,
      })),
      getUsuarios(...args) {
        console.log('getUsuarios', ...args);
      },
    }),
    options: props => ({
      variables: {
        idEstacion: props.idEstacion,
      },
    }),
  },
)(Eventos);
