const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const pool = require("../db");

const router = express.Router();

// Sign up form
router.get("/sign-up", (req, res) => {
  res.render("sign-up-form");
});

// Handle sign up
router.post("/sign-up", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      hashedPassword,
    ]);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

// Handle login
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// Handle logout
router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
