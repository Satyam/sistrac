const terminus = require('@godaddy/terminus');
import { server, start, stop } from './server';
import { REST_HOST, REST_PORT } from './config';

terminus(server, {
  onSignal: () => {
    console.log('closing ...');
    return stop();
  },
  onShutdown: () => {
    console.log(`Server at ${REST_HOST}:${REST_PORT}/ closed`);
  },
});

async function startup() {
  try {
    await start();
    console.log(`Server running at ${REST_HOST}:${REST_PORT}/`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startup();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
