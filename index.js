const express = require("express");

const cookieSession = require("cookie-session");
const passport = require("passport");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const keys = require("./config/keys");

// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.get("/", (req, res) => {
//   res.send({ hi: "there" });
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: "/auth/google/callback"
//     },
//     // accessToken => {
//     //   console.log(accessToken);
//     // }
//     (accessToken, refreshToken, profile, done) => {
//       console.log("access token", accessToken);
//       console.log("refreshToken", refreshToken);
//       console.log("profile", profile);
//     }
//   )
// );

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"]
//   })
// );

// app.get("/auth/google/callback", passport.authenticate("google"));

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
