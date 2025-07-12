const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");

// Home page
router.get("/", (req, res) => {
  res.render("index");
});

// Private page
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.send(
    `<h1>Welcome to your dashboard, ${req.user.username}!</h1><a href="/">Back home</a>`
  );
});

module.exports = router;
