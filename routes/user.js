const express = require("express");
const router = express.Router();

const {
  handleSignup,
  handleLogin,
  handleLogout,
} = require("../controllers/user");

router.post("/", handleSignup);

router.post("/logout", handleLogout);

router.post("/login", handleLogin);

module.exports = router;
