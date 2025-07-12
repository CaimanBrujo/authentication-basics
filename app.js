require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("node:path");

const app = express();

// Passport configuration
require("./config/passport");

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Make user available in views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
