// const { v4: uuidv4 } = require("uuid");
const USER = require("../models/user");
const { setUser } = require("../utils/auth");

const handleSignup = async (req, res) => {
  const body = req.body;
  const existingUser = await USER.findOne({ email: body.email });

  if (existingUser)
    return res.render("signup", { error: "Email already in use" });

  await USER.create({
    name: body.name,
    email: body.email,
    password: body.password,
  });
  return res.redirect("/");
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await USER.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid username or password",
    });
  }
  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  // res.cookie("uid", sessionId);

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
};

const handleLogout = async (req, res) => {
  res.clearCookie("uid");
  res.redirect("/login");
};

module.exports = { handleSignup, handleLogin, handleLogout };
