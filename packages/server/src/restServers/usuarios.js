import jwt from 'jsonwebtoken';
import md5 from 'md5';
import join from './plainJoin';

import { SECRET, SESSION_TIMEOUT, COOKIE_NAME } from '../config';

import {
  readUsuarioPorUsuario,
  createUsuario,
  deleteUsuario,
  updateUsuario,
  readUsuarios,
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
    maxAge: SESSION_TIMEOUT,
  });
}

const bypassAuthenticationPattern = /\/((login)|(signup))$/;

export function authenticate(req, res, next) {
  if (req.method === 'OPTIONS' || bypassAuthenticationPattern.test(req.path)) {
    next();
    return;
  }
  const cookie = req.cookies && req.cookies[COOKIE_NAME];
  if (cookie) {
    try {
      const { iat, ...user } = jwt.verify(cookie, SECRET);
      setCookie(res, user);
      req.user = user;
      next();
      return;
    } catch (err) {
      res.status(UNAUTHORIZED).json(err);
    }
  }
  res.status(UNAUTHORIZED).end();
}

export default async function(dataRouter, path) {
  dataRouter.put(join(path, '/login'), async (req, res) => {
    const { password, ...user } = await readUsuarioPorUsuario(req.body.usuario);
    if (Object.keys(user).length) {
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

  dataRouter.get(join(path, '/_actual'), async (req, res) => {
    const { password, ...user } = await readUsuarioPorUsuario(req.user.usuario);
    if (Object.keys(user).length) res.json(user);
    else res.status(NOT_FOUND).end();
  });

  dataRouter.get(join(path, '/:usuario'), async (req, res) => {
    const { usuario } = req.params;
    const list = usuario.split(',');
    if (list.length > 1) {
      res.json(await readUsuarios(list));
    } else {
      const { password, ...user } = await readUsuarioPorUsuario(usuario);
      if (Object.keys(user).length) res.json(user);
      else res.status(NOT_FOUND).end();
    }
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

export function esDios(req, res, next) {
  if (req.user && req.user.rolDios) {
    next();
  } else {
    res.status(UNAUTHORIZED).end();
  }
}

export function esGuarda(req, res, next) {
  if (req.user && req.user.rolGuarda) {
    next();
  } else {
    res.status(UNAUTHORIZED).end();
  }
}

export function esMecanico(req, res, next) {
  if (req.user && req.user.rolMecanico) {
    next();
  } else {
    res.status(UNAUTHORIZED).end();
  }
}

export function esSupervisor(req, res, next) {
  if (req.user && req.user.rolSupervisor) {
    next();
  } else {
    res.status(UNAUTHORIZED).end();
  }
}

export function tieneNivel(minimo) {
  return (req, res, next) => {
    if (req.user && req.user.nivel >= minimo) {
      next();
    } else {
      res.status(UNAUTHORIZED).end();
    }
  };
}
