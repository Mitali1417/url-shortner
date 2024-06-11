// const sessionIdToUserMap = new Map();

// const setUser = (id, user) => {
//   return sessionIdToUserMap.set(id, user);
// };

// const getUser = (id) => {
//   return sessionIdToUserMap.get(id);
// };

// module.exports = { setUser, getUser };

const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secretKey
  );
};

const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

module.exports = { setUser, getUser };
