const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("../db");

// Local strategy: username + password
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = result.rows[0];
      if (!user) return done(null, false, { message: "Invalid username" });

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return done(null, false, { message: "Invalid password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize user ID into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = result.rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});
