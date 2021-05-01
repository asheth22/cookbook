import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'dotenv';
import User from '../../models/user.model';

config()

const jwtPublicSecret = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGKOLhzmEwYAMAGdIu/UBn5tO9
rHS50DVo9LwDXGF2BsSnfYGgHZcZY+ASAeoZqUDEFOqn2sNxPCfGzfSWtZQBAdWV
qH37WZQIOb8dfg104vllatq6kkRnrul9L6SbO9Skl23UnhIo8BMpaB1RD4cc3NIB
NVHAtt+aFdVP81gKYQIDAQAB`.replace(/\\n/g, '\n');

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  
  return token;
};

const options = {
  secretOrKey: jwtPublicSecret,
  algorithms: ['RS256'],
  passReqToCallback: true,
};

options.jwtFromRequest = ExtractJwt.fromExtractors([
  ExtractJwt.fromAuthHeaderAsBearerToken(),
  req => cookieExtractor(req),
]);

passport.use(
  new Strategy(options, (req, jwtPayload, done) => {
    User.findOne({ _id: jwtPayload.id })
      .then(user => {
        if (user) {
          delete user._doc.password;
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => {
        if (err) {
          return done(err, false);
        }
      });
  }),
);

export default passport;