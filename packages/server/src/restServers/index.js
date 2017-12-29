import estaciones from './estaciones';
import usuarios from './usuarios';
import tipos from './tipos';

export default function(dataRouter) {
  estaciones(dataRouter, '/estaciones');
  usuarios(dataRouter, '/usuarios');
  tipos(dataRouter, '/tipos');
}
