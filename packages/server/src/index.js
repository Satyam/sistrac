import { start, stop } from './server';
import { HOST, PORT } from '../config';

async function startup() {
  try {
    await start();
    console.log(`Server running at ${HOST}:${PORT}/`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startup();

const shutdown = async () => {
  console.log('Closing ...');
  await stop();
  console.log(`Server at ${HOST}:${PORT}/ closed`);
  process.exit();
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
