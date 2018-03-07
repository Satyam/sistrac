import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import EditEstacion from '_components/EditEstacion';

const mapData = graphql(
  gql`
    query($idEstacion: ID) {
      estacion(idEstacion: $idEstacion) {
        idEstacion
        nombre
        latitud
        longitud
      }
    }
  `,
  {
    props: result => {
      console.log(result);
      const estacion = result.data.estacion || {};
      return {
        estacion,
      };
    },
    options: props => ({
      variables: {
        idEstacion: props.match.params.idEstacion,
      },
    }),
  },
);

const createEstacion = graphql(
  gql`
    mutation(
      $idEstacion: ID!
      $nombre: String
      $latitud: Float
      $longitud: Float
    ) {
      createEstacion(
        idEstacion: $idEstacion
        nombre: $nombre
        latitud: $latitud
        longitud: longitud
      ) {
        estacion(idEstacion: $idEstacion) {
          idEstacion
          nombre
          latitud
          longitud
        }
      }
    }
  `,
  {
    name: 'onSave',
    props: result => result.data,
    options: props => ({
      variables: props,
    }),
  },
);
export default compose(withRouter, mapData, createEstacion)((...args) => {
  console.log('props', args);
  return EditEstacion(...args);
});
