import http from 'http';
import { promisify } from 'util';
import { resolve } from 'path';
import express, { Router as createRouter } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import buildSchema from './utils/buildSchema';

import { REST_PORT, REST_API_PATH, APP_HOST, APP_PORT } from './config';

import { init as dbInit, close as dbClose } from './dbOps';
import restServers from './restServers';

import authenticate from './utils/authenticate';

const app = express();
export const server = http.createServer(app);

const listen = promisify(server.listen.bind(server));
const httpClose = promisify(server.close.bind(server));

export async function stop() {
  await dbClose();
  return httpClose();
}

app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(
  cors({
    origin: `${APP_HOST}:${APP_PORT}`,
    credentials: true,
  }),
);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema: buildSchema(resolve(__dirname, './graphql')),
  }),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

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

app.use(
  express.static(resolve(__dirname, '../../desktop/build/'), { index: false }),
);

app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../../desktop/build/index.html'));
});

export async function start() {
  await dbInit();
  await restServers(dataRouter);
  await listen(REST_PORT);
}
