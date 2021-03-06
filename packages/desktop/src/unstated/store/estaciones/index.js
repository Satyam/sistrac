// @flow
import { Container } from 'unstated';
import restAPI from '_store/utils/restAPI';
import indexBy from '_store/utils/indexBy';

import { NAME } from './constants';

const api = restAPI(NAME);

type EstacionesState = {
  estaciones: { [IdEstacion]: Estacion },
  trenes: { [IdEstacion]: Array<IdTren> },
  eventos: { [IdEstacion]: Array<IdEvento> },
};
export default class Estaciones extends Container<EstacionesState> {
  state = { estaciones: {}, trenes: {}, eventos: {} };

  getEstaciones(): Promise<Array<Estacion>> {
    return api.read('/').then(estaciones => {
      this.setState({
        estaciones: indexBy(estaciones, 'idEstacion', this.state.estaciones),
      });
      return estaciones;
    });
  }
  getEstacion(idEstacion: IdEstacion): Promise<Estacion> {
    return api.read(`/${idEstacion}`).then(estacion => {
      this.setState({ estaciones: { [estacion.idEstacion]: estacion } });
      return estacion;
    });
  }
  existeEstacion(idEstacion: IdEstacion): Promise<boolean> {
    return api.read(`/existe/${idEstacion}`).then(
      () => true,

      err => {
        if (err.code === 404) return false;
        throw err;
      },
    );
  }

  getTrenesEstacion(idEstacion: IdEstacion): Promise<Array<Tren>> {
    return api
      .read(`/trenes/${idEstacion}`)
      .then(trenes =>
        trenes.map(tren => ({ ...tren, fecha: new Date(tren.fecha) })),
      )
      .then(trenes => {
        this.setState({
          trenes: {
            ...this.state.trenes,
            [idEstacion]: trenes.map(tren => tren.idTren),
          },
        });
        return trenes;
      });
  }

  getEventosPorEstacion(idEstacion: IdEstacion): Promise<Array<Evento>> {
    return api
      .read(`/eventos/${idEstacion}`)
      .then(eventos =>
        eventos.map(evento => ({ ...evento, fecha: new Date(evento.fecha) })),
      )
      .then(eventos => {
        this.setState({
          eventos: {
            ...this.state.eventos,
            [idEstacion]: eventos.map(evento => evento.idEvento),
          },
        });
        return eventos;
      });
  }

  createEstacion(estacion: Estacion): Promise<boolean> {
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

  updateEstacion(estacion: Estacion): Promise<boolean> {
    return api.update(estacion.idEstacion, estacion).then(() => {
      this.setState({
        estaciones: {
          ...this.state.estaciones,
          [estacion.idEstacion]: estacion,
        },
      });
    });
  }

  deleteEstacion(idEstacion: IdEstacion): Promise<boolean> {
    return api.delete(idEstacion).then(() => {
      const { [idEstacion]: deleted, ...rest } = this.state.estaciones;
      this.setState({ estaciones: rest });
    });
  }

  // $FlowFixMe
  selEstaciones(): Array<Estacion> {
    return Object.values(this.state.estaciones);
  }

  selEstacion(idEstacion: IdEstacion): Estacion {
    return this.state.estaciones[idEstacion];
  }

  selTrenesPorEstacion(idEstacion: IdEstacion): Array<IdTren> {
    return this.state.trenes[idEstacion];
  }

  selEventosPorEstacion(idEstacion: IdEstacion): Array<IdEvento> {
    return this.state.eventos[idEstacion];
  }
}
