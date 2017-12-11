import estaciones from './estaciones';
import usuarios from './usuarios';

export default function(dataRouter) {
  estaciones(dataRouter, '/estaciones');
  usuarios(dataRouter, '/usuarios');
}
