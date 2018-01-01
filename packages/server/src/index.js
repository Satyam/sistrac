import { start, stop } from './server';
import { REST_HOST, REST_PORT } from './config';

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

const shutdown = async () => {
  console.log('Closing ...');
  await stop();
  console.log(`Server at ${REST_HOST}:${REST_PORT}/ closed`);
  process.exit();
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
