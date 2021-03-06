import terminus from '@godaddy/terminus';
import { server, start, stop } from './server';

terminus(server, {
  onSignal: () => {
    console.log('closing ...');
    return stop();
  },
  onShutdown: () => {
    console.log(
      `Server at ${process.env.REACT_APP_REST_HOST}:${
        process.env.REACT_APP_REST_PORT
      }/ closed`,
    );
  },
});

async function startup() {
  try {
    await start();
    console.log(
      `Server running at ${process.env.REACT_APP_REST_HOST}:${
        process.env.REACT_APP_REST_PORT
      }/`,
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startup();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
