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

  getEventosPorTren(idTren: IdTren): Promise<Array<Evento>> {
    return api.read(`/tren/${idTren}`).then(eventos => {
      this.setState({ eventos: indexBy(eventos, 'idEvento') });
      return eventos;
    });
  }
  // $FlowFixMe
  selEventosPorTren(idTren: IdTren): Array<Evento> {
    return Object.values(this.state.eventos).filter(
      // $FlowFixMe
      evento => evento.idTren === idTren,
    );
  }

  loadEventos: (Array<Evento>) => Array<Evento> = eventos => {
    this.setState({
      eventos: indexBy(eventos, 'idEvento', this.state.eventos),
    });
    return eventos;
  };

  selEvento(idEvento: IdEvento): Evento {
    return this.state.eventos[idEvento];
  }
}
