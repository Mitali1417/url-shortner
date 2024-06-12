const { getUser } = require("../utils/auth");

const restrictToLoggedInUserOnly = async (req, res, next) => {
  const userId = req.cookies?.uid;
  if (!userId) {
    return res.redirect("/login");
  }
  const user = getUser(userId);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
};

const checkAuth = (req, res, next) => {
  const userId = req.cookies?.uid;
  const user = getUser(userId);
  req.user = user;
  next();
};

module.exports = { restrictToLoggedInUserOnly, checkAuth };
