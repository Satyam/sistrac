// @flow
import { Container } from 'unstated';
import restAPI from '_store/utils/restAPI';
import indexBy from '_store/utils/indexBy';

import { NAME } from './constants';

const api = restAPI(NAME);
type EventosState = {
  eventos: { [IdEvento]: Evento },
};
export default class Eventos extends Container<EventosState> {
  state = { eventos: {} };

  getEventosPorEstacion(idEstacion: IdEstacion): Promise<Array<Evento>> {
    return api.read(`/estacion/${idEstacion}`).then(eventos => {
      this.setState({ eventos: indexBy(eventos, 'idEvento') });
      return eventos;
    });
  }

  getEventosPorTren(idTren: IdTren): Promise<Array<Evento>> {
    return api.read(`/tren/${idTren}`).then(eventos => {
      this.setState({ eventos: indexBy(eventos, 'idEvento') });
      return eventos;
    });
  }

  selEventosPorEstacion(idEstacion: IdEstacion): Array<Evento> {
    return Object.values(this.state.eventos).filter(
      evento => evento.idEstacion === idEstacion,
    );
    // The following works with flow, but it is otherwise absurd
    // const evts = this.state.eventos;
    // return Object.keys(evts)
    //   .filter(idEvento => evts[Number(idEvento)].idEstacion === idEstacion)
    //   .map(idEvento => evts[Number(idEvento)]);
  }

  selEventosPorTren(idTren: IdTren): Array<Evento> {
    return Object.values(this.state.eventos).filter(
      evento => evento.idTren === idTren,
    );
  }
}
