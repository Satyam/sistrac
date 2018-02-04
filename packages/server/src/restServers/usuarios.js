import md5 from 'md5';
import join from '../utils/plainJoin';

import {
  readUsuarioPorUsuario,
  createUsuario,
  deleteUsuario,
  updateUsuario,
  readUsuarios,
  loginUsuario
} from '../dbOps/usuarios';

import {
  CREATED,
  NOT_FOUND,
  NO_CONTENT,
  UNAUTHORIZED,
  BAD_REQUEST,
  CONFLICT
} from '../utils/httpStatusCodes';

import { setCookie, clearCookie } from '../utils/cookie';

export default async function(dataRouter, path) {
  dataRouter.put(join(path, '/login'), async (req, res) => {
    const { usuario, password } = req.body;
    const user = await loginUsuario(usuario, password ? md5(password) : null);
    if (user) {
      setCookie(res, user);
      res.json(user);
      return;
    }
    clearCookie(res);
    res.status(UNAUTHORIZED).end();
  });

  dataRouter.post(join(path, '/signup'), async (req, res) => {
    const { usuario, password, nombre } = req.body;
    clearCookie(res);
    if (!usuario || !password || !nombre) {
      res
        .status(BAD_REQUEST)
        .send(
          'Favor de indicar código de usuario, contraseña y nombre completo.'
        );
    } else {
      const resp = await createUsuario({
        ...req.body,
        password: md5(password)
      });
      res.status(resp ? CREATED : CONFLICT).end();
    }
  });

  dataRouter.get(join(path, '/logout'), (req, res) => {
    clearCookie(res);
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
      req.body
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
