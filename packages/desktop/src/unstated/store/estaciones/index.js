import { Container } from 'unstated';
import restAPI from '_store/utils/restAPI';
import indexBy from '_store/utils/indexBy';

import { NAME } from './constants';

const api = restAPI(NAME);

export default class Estaciones extends Container {
  state = {};

  getEstaciones() {
    return api.read('/').then(estaciones => {
      this.setState(indexBy(estaciones, 'idEstacion', this.state));
    });
  }
  getEstacion(idEstacion) {
    return api.read(`/${idEstacion}`).then(estacion => {
      this.setState({ [estacion.idEstacion]: estacion });
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
    const estacion = this.state[idEstacion];
    if (estacion.trenes) return;
    return api.read(`/trenes/${idEstacion}`).then(trenes => {
      this.setState({
        [idEstacion]: {
          ...this.state[idEstacion],
          trenes: trenes.map(tren => ({
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
            ...this.state,
            [estacion.idEstacion]: estacion,
          });
        }
        return success;
      });
  }

  updateEstacion(idEstacion, estacion) {
    return api.update(idEstacion, estacion).then(() => {
      this.setState({
        ...this.state,
        [estacion.idEstacion]: estacion,
      });
    });
  }

  deleteEstacion(idEstacion) {
    return api.delete(idEstacion).then(() => {
      const { [idEstacion]: deleted, ...rest } = this.state;
      this.setState(rest, true);
    });
  }

  selEstaciones() {
    return Object.values(this.state);
  }

  selEstacion(idEstacion) {
    return this.state[idEstacion];
  }

  selTrenesPorEstacion(idEstacion) {
    return this.state[idEstacion].trenes;
  }
}
