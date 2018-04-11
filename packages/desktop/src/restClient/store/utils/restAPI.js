import ServerError from './serverError';
// import dbg from 'debug';
import plainJoin from './plainJoin';

// dbg.enable('Sistrac:restAPI');
// const debug = dbg('Sistrac:restAPI');

const clients = {};

export default (
  base,
  host = `${process.env.REACT_APP_REST_HOST}:${
    process.env.REACT_APP_REST_PORT
  }`,
) => {
  const key = plainJoin(host, base);
  if (clients[key]) return clients[key];
  const restClient = method => async (path = '/', body) => {
    const response = await fetch(
      plainJoin(host, process.env.REACT_APP_REST_PATH, base, path),
      {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: body && JSON.stringify(body),
      },
    );
    if (!response.ok) {
      throw new ServerError(
        response.status,
        response.statusText,
        method,
        plainJoin(base, path),
      );
    }
    const text = await response.text();
    if (text) return JSON.parse(text);
    return {};
  };
  clients[key] = {
    create: restClient('post'),
    read: restClient('get'),
    update: restClient('put'),
    delete: restClient('delete'),
  };
  return clients[key];
};
