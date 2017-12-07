import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import bodyParser from 'body-parser';
import { readUsuarioByUsername as getUser, createUsuario } from './dbOps';

// https://www.djamware.com/post/58eba06380aca72673af8500/node-express-mongoose-and-passportjs-rest-api-authentication

const SECRET = 'Sistrac clave secreta: pepino'; // todo el string es el secreto;

export function setStrategy() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: SECRET,
  };
  passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    console.log('verify', jwtPayload.username);
    try {
      const user = await getUser(jwtPayload.username);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  }));
}

export async function signup(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.json({ success: false, msg: 'Please pass username and password.' });
  } else {
    try {
      await createUsuario({ Usuario: username, Password: md5(password) });
      res.json({ success: true, msg: 'Successful created new user.' });
    } catch (err) {
      console.error('**** Usuario repetido ****', err);
      if (err.code === 11000) {
        res.json({ success: false, msg: 'Username already exists.', err });
      } else {
        res.status(500).send(`MongoDB error ${err.message}`);
      }
    }
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (user) {
    const isMatch = md5(password) === user.password;
    if (isMatch) {
      const token = jwt.sign({ username }, SECRET);
      // return the information including token as JSON
      res.json({
        success: true,
        token: `JWT ${token}`,
        preferences: user.preferences,
      });
    } else {
      res.json({
        success: false,
        msg: 'Authentication failed. Wrong password.',
      });
    }
  } else {
    res.json({
      success: false,
      msg: 'Authentication failed. Username not found.',
    });
  }
}

export function logout(req, res) {
  req.logout();
  res.json({});
}
/* eslint-disable consistent-return */
export async function userData(req, res) {
  try {
    const { Password, ...user } = await getUser(req.params.username);
    return res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
}
/* eslint-enable consistent-return */

export function authenticate(req, res, next) {
  return passport.authenticate('jwt', { session: false })(req, res, next);
}

export function userRoutes(app, path) {
  app.use(passport.initialize());
  app.use(`${path}/signup`, bodyParser.json(), signup);
  app.use(`${path}/login`, bodyParser.json(), login);
  app.use(`${path}/logout`, logout);
  app.get(`${path}/data/:username`, authenticate, userData);
}
