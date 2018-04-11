import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from './httpStatusCodes';
import { setCookie, getCookie } from './cookie';

const bypassAuthenticationPattern = /\/((login)|(signup))$/;

export default function authenticate(req, res, next) {
  if (req.method === 'OPTIONS' || bypassAuthenticationPattern.test(req.path)) {
    next();
    return;
  }
  const cookie = getCookie(req);
  if (cookie) {
    try {
      const { iat, ...user } = jwt.verify(
        cookie,
        process.env.REACT_APP_COOKIE_SECRET,
      );
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
