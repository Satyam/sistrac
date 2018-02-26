import { Container } from 'unstated';
import restAPI from '_store/utils/restAPI';
import indexBy from '_store/utils/indexBy';

import { NAME } from './constants';

const api = restAPI(NAME);

export default class Eventos extends Container {
  state = { eventos: {} };

  getEventosPorEstacion(idEstacion) {
    return api.read(`/estacion/${idEstacion}`).then(eventos => {
      this.setState({ eventos: indexBy(eventos, 'idEvento') });
      return eventos;
    });
  }

  getEventosPorTren(idTren) {
    return api.read(`/tren/${idTren}`).then(eventos => {
      this.setState({ eventos: indexBy(eventos, 'idEvento') });
      return eventos;
    });
  }

  selEventosPorEstacion(idEstacion) {
    return Object.values(this.state.eventos).filter(
      evento => evento.idEstacion === idEstacion,
    );
  }

  selEventosPorTren(state, idTren) {
    return Object.values(this.state.eventos).filter(
      evento => evento.idTren === idTren,
    );
  }
}
