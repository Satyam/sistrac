import React from 'react';
import { Route } from 'react-router-dom';
import loadModule from '../utils/loadModule';

export default function Routes() {
  return (
    <div>
      <Route
        path="/estaciones"
        component={loadModule(() =>
          import(/* webpackChunkName: "estaciones" */ '../Estaciones'),
        )}
      />
      <Route
        path="/estacion/:idEstacion/:activeTab?"
        component={loadModule(() =>
          import(/* webpackChunkName: "estacion" */ '../Estacion'),
        )}
      />
      <Route
        path="/login"
        component={loadModule(() =>
          import(/* webpackChunkName: "login" */ '../LoginForm'),
        )}
      />
    </div>
  );
}
