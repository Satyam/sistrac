// @flow
import { Container } from 'unstated';
// import restAPI from '_store/utils/restAPI';
import indexBy from '_store/utils/indexBy';

// import { NAME } from './constants';

// const api = restAPI(NAME);

type TrenesState = {
  trenes: { [IdTren]: Tren },
};

export default class Trenes extends Container<TrenesState> {
  state = { trenes: {} };

  loadTrenes: (Array<Tren>) => Array<Tren> = trenes => {
    this.setState({
      trenes: indexBy(trenes, 'idTren', this.state.trenes),
    });
    return trenes;
  };
  selTren(idTren: IdTren): Tren {
    return this.state.trenes[idTren];
  }
}
