/* USER AUTHENTICATION WITH PASSPORT */
const cookieSession = require('cookie-session');
const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(cookieSession({ 
  name: "session",
  keys: ["donate"], /*secret key*/
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  // clientID: GOOGLE_CLIENT_ID,
  // clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://localhost:3000/auth/google/callback'
},

  function(accessToken, refreshToken, profile, cb){
    User.findOrCreate({ googleId: profile.id }, function(err, user){
      return cb(err, user);
      });
    }
  ));
