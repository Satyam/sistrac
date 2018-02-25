import { Container } from 'unstated';
import restAPI from '_store/utils/restAPI';
import indexBy from '_store/utils/indexBy';

import { NAME } from './constants';

const api = restAPI(NAME);

export default class Estaciones extends Container {
  state = { estaciones: {}, trenes: {} };

  getEstaciones() {
    return api.read('/').then(estaciones => {
      this.setState({
        estaciones: indexBy(estaciones, 'idEstacion', this.state.estaciones),
      });
    });
  }
  getEstacion(idEstacion) {
    return api.read(`/${idEstacion}`).then(estacion => {
      this.setState({ estaciones: { [estacion.idEstacion]: estacion } });
    });
  }
  existeEstacion(idEstacion) {
    return api.read(`/existe/${idEstacion}`).then(
      () => true,

      err => {
        if (err.code === 404) return false;
        throw err;
      },
    );
  }

  getTrenesEstacion(idEstacion) {
    return api.read(`/trenes/${idEstacion}`).then(trenes => {
      this.setState({
        trenes: {
          ...this.state.trenes,
          [idEstacion]: trenes.map(tren => ({
            ...tren,
            fecha: new Date(tren.fecha),
            idEstacion,
          })),
        },
      });
    });
  }
  createEstacion(estacion) {
    return api
      .create('/', estacion)
      .then(() => true, () => false)
      .then(success => {
        if (success) {
          this.setState({
            estaciones: {
              ...this.state.estaciones,
              [estacion.idEstacion]: estacion,
            },
          });
        }
        return success;
      });
  }

  updateEstacion(idEstacion, estacion) {
    return api.update(idEstacion, estacion).then(() => {
      this.setState({
        estaciones: {
          ...this.state.estaciones,
          [estacion.idEstacion]: estacion,
        },
      });
    });
  }

  deleteEstacion(idEstacion) {
    return api.delete(idEstacion).then(() => {
      const { [idEstacion]: deleted, ...rest } = this.state.estaciones;
      this.setState({ estaciones: rest });
    });
  }

  selEstaciones() {
    return Object.values(this.state.estaciones);
  }

  selEstacion(idEstacion) {
    return this.state.estaciones[idEstacion];
  }

  selTrenesPorEstacion(idEstacion) {
    return this.state.trenes[idEstacion];
  }
}
