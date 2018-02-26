import { Container } from 'unstated';
import restAPI from '_store/utils/restAPI';
import indexBy from '_store/utils/indexBy';

import { NAME } from './constants';

const api = restAPI(NAME);

export default class Tipos extends Container {
  state = { eventos: {}, emergencias: {} };

  loadTiposEventos() {
    if (this.selHayTiposEventos()) return;
    return api.read('/eventos').then(eventos => {
      this.setState({
        eventos: indexBy(eventos, 'idTipoEvento'),
      });
    });
  }

  loadTiposEmergencias() {
    if (this.selHayTiposEmergencias()) return;
    return api.read('/emergencias').then(emergencias => {
      this.setState({
        emergencias: indexBy(emergencias, 'idTipoEmergencia'),
      });
    });
  }

  selTiposEventos() {
    return this.state.eventos;
  }

  selTiposEmergencias() {
    return this.state.emergencias;
  }

  selTipoEvento(idTipoEvento) {
    return this.state.eventos[idTipoEvento];
  }

  selDescrEvento(idTipoEvento) {
    const ev = this.state.eventos[idTipoEvento];
    if (ev) {
      return `${ev.descr} ${ev.preposicion}`;
    }
    return '';
  }

  selTipoEmergencia(idTipoEmergencia) {
    return idTipoEmergencia
      ? this.state.emergencias[idTipoEmergencia]
      : { descr: '' };
  }

  selDescrEmergencia(idTipoEmergencia) {
    if (!idTipoEmergencia) return '';
    const em = this.state.emergencias[idTipoEmergencia];
    if (em) {
      return em.descr;
    }
    return '';
  }

  selHayTiposEventos() {
    return Object.keys(this.state.eventos).length > 0;
  }

  selHayTiposEmergencias() {
    return Object.keys(this.state.emergencias).length > 0;
  }
}
