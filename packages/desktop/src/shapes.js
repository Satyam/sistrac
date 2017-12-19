import PropTypes from 'prop-types';

export const usuarioShape = PropTypes.shape({
  idUsuario: PropTypes.number,
  password: PropTypes.string,
  usuario: PropTypes.string,
  nivel: PropTypes.number,
  rolGuarda: PropTypes.bool,
  rolDios: PropTypes.bool,
  rolSupervisor: PropTypes.bool,
  rolMecanico: PropTypes.bool,
  funcion: PropTypes.number,
  nombre: PropTypes.string,
});

export const estacionShape = PropTypes.shape({
  idEstacion: PropTypes.number,
  nombre: PropTypes.string,
  latitud: PropTypes.number,
  sigla: PropTypes.string,
  longitud: PropTypes.number,
});

// From React-Router
export const locationShape = PropTypes.shape({
  key: PropTypes.string,
  pathname: PropTypes.string,
  search: PropTypes.string,
  hash: PropTypes.string,
  state: PropTypes.any,
});

export const historyShape = PropTypes.shape({
  length: PropTypes.number, // The number of entries in the history stack
  action: PropTypes.string, //The current action (PUSH, REPLACE, or POP)
  location: locationShape, // The current location. May have the following properties:
  pathname: PropTypes.string, // The path of the URL
  search: PropTypes.string, // The URL query string
  hash: PropTypes.string, // The URL hash fragment
  state: PropTypes.any, //  - (object) location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.
  push: PropTypes.func, //  Pushes a new entry onto the history stack
  replace: PropTypes.func, // Replaces the current entry on the history stack
  go: PropTypes.func, // Moves the pointer in the history stack by n entries
  goBack: PropTypes.func, // Equivalent to go(-1)
  goForward: PropTypes.func, // Equivalent to go(1)
  block: PropTypes.func, // Prevents navigation (see the history docs)
});

export const routerMatchShape = PropTypes.shape({
  params: PropTypes.any, // Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
  isExact: PropTypes.bool, // true if the entire URL was matched (no trailing characters)
  path: PropTypes.string, // The path pattern used to match. Useful for building nested <Route>s
  url: PropTypes.string, // The matched portion of the URL. Useful for building nested <Link>s
});

export const withRouterTypes = {
  match: routerMatchShape,
  location: locationShape,
  history: historyShape,
};
