import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import initStore from '_components/utils/initStore';

import { loadTiposEventos, loadTiposEmergencias } from '_store/actions';
import { selTiposEventos, selTiposEmergencias } from '_store/selectors';

export function Tipos(eventos, emergencias) {
  return (
    <div>
      <pre>{JSON.stringify(eventos, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(eventos, null, 2)}</pre>
    </div>
  );
}

export const storeInitializer = dispatch => {
  return Promise.all([
    dispatch(loadTiposEventos()),
    dispatch(loadTiposEmergencias()),
  ]);
};

export const mapStateToProps = state => ({
  eventos: selTiposEventos(state),
  emergencias: selTiposEmergencias(state),
});

export default compose(initStore(storeInitializer), connect(mapStateToProps))(
  Tipos,
);
