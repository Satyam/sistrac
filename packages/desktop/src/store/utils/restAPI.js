import ServerError from './serverError';
// import dbg from 'debug';
import plainJoin from './plainJoin';

import { HOST, PORT, REST_API_PATH, SESSION_TIMEOUT } from '../../config.js';
// dbg.enable('Sistrac:restAPI');
// const debug = dbg('Sistrac:restAPI');

const clients = {};

export default (base, host = `${HOST}:${PORT}`) => {
  const key = plainJoin(host, base);
  if (clients[key]) return clients[key];
  const restClient = method => async (path = '/', body) => {
    if (
      parseInt(localStorage.getItem('lastAccess'), 10) + SESSION_TIMEOUT <
      Date.now()
    ) {
      localStorage.removeItem('authorization');
    } else {
      localStorage.setItem('lastAccess', String(Date.now()));
    }
    const response = await fetch(plainJoin(host, REST_API_PATH, base, path), {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authorization') || '',
      },
      credentials: 'include',
      body: body && JSON.stringify(body),
    });
    if (!response.ok) {
      throw new ServerError(
        response.status,
        response.statusText,
        method,
        plainJoin(base, path),
      );
    }
    return response.json();
  };
  clients[key] = {
    create: restClient('post'),
    read: restClient('get'),
    update: restClient('put'),
    delete: restClient('delete'),
  };
  return clients[key];
};
