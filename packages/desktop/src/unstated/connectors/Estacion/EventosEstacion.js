// @flow
import connect from '_connectors/utils/connect';
import type { MapProps, Init } from '_connectors/utils/connect';

import Eventos from '_components/Estacion/EventosEstacion';
import estacionesStore from '_store/estaciones';
import eventosStore from '_store/eventos';
import usuariosStore from '_store/usuarios';
import tiposStore from '_store/tipos';

export const init: Init<eventosStore> = (
  estaciones,
  eventos,
  usuarios: usuariosStore,
  tipos: tiposStore,
  { idEstacion }: { idEstacion: IdEstacion },
) =>
  Promise.all([
    estaciones.selEventosPorEstacion(idEstacion) ||
      estaciones
        .getEventosPorEstacion(idEstacion)
        .then(eventos.loadEventos)
        .then(eventos =>
          usuarios.getUsuarios(eventos.map(evento => evento.idUsuario)),
        ),
    tipos.loadTiposEventos(),
    tipos.loadTiposEmergencias(),
  ]);

export const mapProps: MapProps<eventosStore> = (
  estaciones,
  eventos,
  usuarios: usuariosStore,
  tipos: tiposStore,
  { idEstacion }: { idEstacion: IdEstacion },
) => {
  return {
    eventos: (estaciones.selEventosPorEstacion(idEstacion) || [])
      .map(idEvento => eventos.selEvento(idEvento))
      .map(evento => ({
        ...evento,
        descrEvento: tipos.selDescrEvento(evento.idTipoEvento),
        descrEmergencia: tipos.selDescrEmergencia(evento.idTipoEmergencia),
        numeroTren: evento.idTren,
        usuario: (usuarios.selUsuario(evento.idUsuario) || {}).nombre,
      })),
  };
};

export default connect(
  [estacionesStore, eventosStore, usuariosStore, tiposStore],
  mapProps,
  init,
)(Eventos);
