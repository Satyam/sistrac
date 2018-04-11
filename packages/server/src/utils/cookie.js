import jwt from 'jsonwebtoken';

export function getCookie(req) {
  return req.cookies && req.cookies[process.env.REACT_APP_COOKIE_NAME];
}

export function setCookie(res, data) {
  res.cookie(
    process.env.REACT_APP_COOKIE_NAME,
    jwt.sign(data, process.env.REACT_APP_COOKIE_SECRET),
    {
      maxAge: process.env.REACT_APP_SESSION_TIMEOUT,
    },
  );
}

export function clearCookie(res) {
  res.clearCookie(process.env.REACT_APP_COOKIE_NAME);
}
