// @flow
import connect from '_connectors/utils/connect';
import type { MapProps, Init } from '_connectors/utils/connect';

import Eventos from '_components/Estacion/EventosEstacion';
import eventosStore from '_store/eventos';
import usuariosStore from '_store/usuarios';
import tiposStore from '_store/tipos';

export const init: Init = (
  eventos: eventosStore,
  usuarios: usuariosStore,
  tipos: tiposStore,
  { idEstacion }: { idEstacion: IdEstacion },
) =>
  Promise.all([
    eventos
      .getEventosPorEstacion(idEstacion)
      .then(eventos =>
        usuarios.getUsuarios(eventos.map(evento => evento.idUsuario)),
      ),
    tipos.loadTiposEventos(),
    tipos.loadTiposEmergencias(),
  ]);

export const mapProps: MapProps = (
  eventos: eventosStore,
  usuarios: usuariosStore,
  tipos: tiposStore,
  { idEstacion }: { idEstacion: IdEstacion },
) => {
  return {
    eventos: eventos.selEventosPorEstacion(idEstacion).map(evento => ({
      ...evento,
      descrEvento: tipos.selDescrEvento(evento.idTipoEvento),
      descrEmergencia: tipos.selDescrEmergencia(evento.idTipoEmergencia),
      numeroTren: evento.idTren,
      usuario: (usuarios.selUsuario(evento.idUsuario) || {}).nombre,
    })),
  };
};

export default connect(
  [eventosStore, usuariosStore, tiposStore],
  mapProps,
  init,
)(Eventos);
