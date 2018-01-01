import React from 'react';
import { Route } from 'react-router-dom';
import loadModule from '_components/utils/loadModule';

export default function Routes() {
  return (
    <div>
      <Route
        path="/estaciones"
        component={loadModule(() =>
          import(/* webpackChunkName: "estaciones" */ '_components/Estaciones'),
        )}
      />
      <Route
        path="/estacion/:idEstacion/:activeTab?"
        component={loadModule(() =>
          import(/* webpackChunkName: "estacion" */ '_components/Estacion'),
        )}
      />
      <Route
        path="/login"
        component={loadModule(() =>
          import(/* webpackChunkName: "login" */ '_components/LoginForm'),
        )}
      />
    </div>
  );
}
