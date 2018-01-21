import React from 'react';
import { Route } from 'react-router-dom';
import loadModule from '_components/utils/loadModule';

export default function Routes() {
  return (
    <div>
      <Route
        path="/estaciones"
        component={loadModule(() =>
          import(/* webpackChunkName: "estaciones" */ '_connectors/Estaciones'),
        )}
      />
      <Route
        path="/estacion/editEstacion/:idEstacion?"
        component={loadModule(() =>
          import(/* webpackChunkName: "estacion" */ '_connectors/EditEstacion'),
        )}
      />
      <Route
        path="/estacion/:idEstacion/:activeTab?"
        component={loadModule(() =>
          import(/* webpackChunkName: "estacion" */ '_connectors/Estacion'),
        )}
      />
      <Route
        path="/login"
        component={loadModule(() =>
          import(/* webpackChunkName: "login" */ '_connectors/LoginForm'),
        )}
      />
    </div>
  );
}
