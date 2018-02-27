// @flow
import { Container } from 'unstated';
import restAPI from '_store/utils/restAPI';
import indexBy from '_store/utils/indexBy';

import { NAME } from './constants';

const api = restAPI(NAME);

type TiposState = {
  eventos: { [IdTipoEvento]: TipoEvento },
  emergencias: { [IdTipoEmergencia]: TipoEmergencia },
};

export default class Tipos extends Container<TiposState> {
  state = { eventos: {}, emergencias: {} };

  loadTiposEventos(): Promise<Array<TipoEvento>> {
    if (this.selHayTiposEventos()) return Promise.resolve([]);
    return api.read('/eventos').then(eventos => {
      this.setState({
        eventos: indexBy(eventos, 'idTipoEvento'),
      });
      return eventos;
    });
  }

  loadTiposEmergencias(): Promise<Array<TipoEmergencia>> {
    if (this.selHayTiposEmergencias()) return Promise.resolve([]);
    return api.read('/emergencias').then(emergencias => {
      this.setState({
        emergencias: indexBy(emergencias, 'idTipoEmergencia'),
      });
      return emergencias;
    });
  }

  selTiposEventos(): { [IdTipoEvento]: TipoEvento } {
    return this.state.eventos;
  }

  selTiposEmergencias(): { [IdTipoEmergencia]: TipoEmergencia } {
    return this.state.emergencias;
  }

  selTipoEvento(idTipoEvento: IdTipoEvento): TipoEvento {
    return this.state.eventos[idTipoEvento];
  }

  selDescrEvento(idTipoEvento: IdTipoEvento): string {
    const ev = this.state.eventos[idTipoEvento];
    if (ev) {
      return `${ev.descr} ${ev.preposicion}`;
    }
    return '';
  }

  selTipoEmergencia(idTipoEmergencia: IdTipoEmergencia): TipoEmergencia {
    return idTipoEmergencia
      ? this.state.emergencias[idTipoEmergencia]
      : {
          idTipoEmergencia: 0,
          descr: '-- falta descripción para esta emergencia --',
        };
  }

  selDescrEmergencia(idTipoEmergencia: IdTipoEmergencia): string {
    if (!idTipoEmergencia) return '';
    const em = this.state.emergencias[idTipoEmergencia];
    if (em) {
      return em.descr;
    }
    return '';
  }

  selHayTiposEventos(): boolean {
    return Object.keys(this.state.eventos).length > 0;
  }

  selHayTiposEmergencias(): boolean {
    return Object.keys(this.state.emergencias).length > 0;
  }
}
