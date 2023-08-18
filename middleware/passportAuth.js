const passport = require("passport");
const User = require("../models/user");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

exports.auth = () => {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET_KEY;

  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done,) {
     // console.log("payload", jwt_payload.userID);
     const user=await User.findByPk(jwt_payload.userID);
       // function (err, user) {
         // console.log("userrr====>", user);
          if (!user) {
            return done(null, false);
          }
          if (user) {
           // console.log("userrr====>", user);
            return done(null, user);
          } else {
            return done(null, false);
            // or you could create a new account
          }
       // };
    })
  );
};

