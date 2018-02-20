import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const LoadableEstaciones = Loadable({
  loader: () =>
    import(/* webpackChunkName: "estaciones" */ '_connectors/Estaciones'),
  loading() {
    return <div>Loading...</div>;
  },
});

const LoadableEditEstacion = Loadable({
  loader: () =>
    import(/* webpackChunkName: "editEstacion" */ '_connectors/EditEstacion'),
  loading() {
    return <div>Loading...</div>;
  },
});

const LoadableEstacion = Loadable({
  loader: () =>
    import(/* webpackChunkName: "estacion" */ '_connectors/Estacion'),
  loading() {
    return <div>Loading...</div>;
  },
});

const LoadableLogin = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ '_connectors/LoginForm'),
  loading() {
    return <div>Loading...</div>;
  },
});

export default function Routes() {
  return (
    <div>
      <Route path="/estaciones" component={LoadableEstaciones} />
      <Route
        path="/editEstacion/:idEstacion?"
        component={LoadableEditEstacion}
      />
      <Route
        path="/estacion/:idEstacion/:activeTab?"
        component={LoadableEstacion}
      />
      <Route path="/login" component={LoadableLogin} />
    </div>
  );
}
