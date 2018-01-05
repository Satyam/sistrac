import estaciones from './estaciones';
import usuarios from './usuarios';
import tipos from './tipos';
import eventos from './eventos';
import trenes from './trenes';

export default function(dataRouter) {
  estaciones(dataRouter, '/estaciones');
  usuarios(dataRouter, '/usuarios');
  tipos(dataRouter, '/tipos');
  eventos(dataRouter, '/eventos');
  trenes(dataRouter, '/trenes');
}
