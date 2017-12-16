import http from 'http';
import { promisify } from 'util';
import express, { Router as createRouter } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { PORT, REST_API_PATH } from '../config';

import { init as dbInit, close as dbClose } from './dbOps';
import restServers from './restServers';

import { authenticate } from './restServers/usuarios';

const app = express();
const server = http.createServer(app);

const listen = promisify(server.listen.bind(server));
const httpClose = promisify(server.close.bind(server));

export async function stop() {
  await dbClose();
  return httpClose();
}

app.use(compression());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  );
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Allow', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

const dataRouter = createRouter();

app.use(REST_API_PATH, authenticate, bodyParser.json(), dataRouter);

app.get('/kill', (req, res) => {
  res.send('I am dead');
  stop();
  process.exit();
});

app.use('/echo', bodyParser.json(), (req, res) => {
  const { method, path, query, params, body } = req;
  res.json({ method, path, query, params, body });
});

export async function start() {
  await dbInit();
  await restServers(dataRouter);
  await listen(PORT);
}
