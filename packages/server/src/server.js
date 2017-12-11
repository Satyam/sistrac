import http from 'http';
import { join } from 'path';
import { promisify } from 'util';
import express, { Router as createRouter } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { PORT, ROOT_DIR, REST_API_PATH } from '../config';

import { init as dbInit, close as dbClose } from './dbOps';
import restServers from './restServers';

import { authenticate } from './restServers/usuarios';

const absPath = relPath => join(ROOT_DIR, relPath);

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
// To make this server CORS-ENABLEd
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

const dataRouter = createRouter();

app.use(REST_API_PATH, authenticate, bodyParser.json(), dataRouter);

app.use(express.static(absPath('public'), { index: false }));

app.get('/kill', (req, res) => {
  res.send('I am dead');
  stop();
  process.exit();
});

// app.get('*', (req, res) => res.sendFile(absPath('public/index.html')));
app.get('*', (req, res) => res.sendFile(absPath('webServer/index.html')));

export async function start() {
  await dbInit();
  await restServers(dataRouter);
  await listen(PORT);
}
