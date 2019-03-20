const express = require("express");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const keys = require("./config/keys");
require("./services/passport");

const app = express();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT);
