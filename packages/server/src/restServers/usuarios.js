import jwt from 'jsonwebtoken';
import md5 from 'md5';
import { join } from 'path';

import { SECRET, LOGIN_TIMEOUT, COOKIE_NAME } from '../../config';

import {
  readUsuarioPorUsuario as readUsuario,
  createUsuario,
  deleteUsuario,
  updateUsuario,
} from '../dbOps/usuarios';

import {
  CREATED,
  NOT_FOUND,
  NO_CONTENT,
  UNAUTHORIZED,
  BAD_REQUEST,
  CONFLICT,
} from './httpStatusCodes';

export function setCookie(res, data) {
  res.cookie(COOKIE_NAME, jwt.sign(data, SECRET), {
    expiresIn: LOGIN_TIMEOUT,
  });
}

const bypassAuthenticationPattern = /\/((login)|(signup))$/;

export function authenticate(req, res, next) {
  if (req.method === 'GET' && bypassAuthenticationPattern.test(req.path)) {
    next();
  }
  const cookie = req.cookies[COOKIE_NAME];
  if (cookie) {
    try {
      const user = jwt.verify(cookie, SECRET);
      setCookie(res, user);
      req.user = user;
      next();
    } catch (err) {
      res.status(UNAUTHORIZED).json(err);
    }
  }
  res.status(UNAUTHORIZED).end();
}

export default async function(dataRouter, path) {
  dataRouter.put(join(path, '/login'), async (req, res) => {
    const { password, ...user } = await readUsuario(req.body.usuario);
    if (user) {
      const isMatch = md5(req.body.password) === password;
      if (isMatch) {
        setCookie(res, user);
        res.json(user);
        return;
      }
    }
    res.clearCookie(COOKIE_NAME);
    res.status(UNAUTHORIZED).end();
  });

  dataRouter.post(join(path, '/signup'), async (req, res) => {
    const { usuario, password, nombre } = req.body;
    res.clearCookie(COOKIE_NAME);
    if (!usuario || !password || !nombre) {
      res
        .status(BAD_REQUEST)
        .send(
          'Favor de indicar código de usuario, contraseña y nombre completo.',
        );
    } else {
      const resp = await createUsuario({
        ...req.body,
        password: md5(password),
      });
      res.status(resp ? CREATED : CONFLICT).end();
    }
  });

  dataRouter.get(join(path, '/logout'), (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(NO_CONTENT).end();
  });

  dataRouter.get(join(path, '/:usuario'), async (req, res) => {
    const { password, ...user } = await readUsuario(req.params.usuario);
    res.json(user);
  });

  dataRouter.delete(join(path, '/:idUsuario'), async (req, res) => {
    const resp = await deleteUsuario(parseInt(req.params.idUsuario, 10));
    res.status(resp ? NO_CONTENT : NOT_FOUND).end();
  });

  dataRouter.put(join(path, '/:idUsuario'), async (req, res) => {
    const resp = await updateUsuario(
      parseInt(req.params.idUsuario, 10),
      req.body,
    );
    res.status(resp ? NO_CONTENT : NOT_FOUND).end();
  });
}
