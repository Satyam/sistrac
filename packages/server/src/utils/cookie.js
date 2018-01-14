import jwt from 'jsonwebtoken';
import { SECRET, SESSION_TIMEOUT, COOKIE_NAME } from '../config';

export function getCookie(req) {
  return req.cookies && req.cookies[COOKIE_NAME];
}

export function setCookie(res, data) {
  res.cookie(COOKIE_NAME, jwt.sign(data, SECRET), {
    maxAge: SESSION_TIMEOUT,
  });
}

export function clearCookie(res) {
  res.clearCookie(COOKIE_NAME);
}
