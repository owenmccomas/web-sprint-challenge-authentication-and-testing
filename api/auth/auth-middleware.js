const User = require("./auth-model");

function checkCred(req, res, next) {
  if (
    !req.body.username ||
    !req.body.username.trim() ||
    !req.body.password ||
    !req.body.password.trim()
  ) {
    return next({ status: 400, message: "username and password required" });
  }

  next();
}

async function uniqueUsername(req, res, next) {
  try {
    const user = await User.findBy({ username: req.body.username });
    !user ? next() : res.status(400).json({ message: "username taken" });
  } catch (err) {
    next(err);
  }
}

async function usernameExists(req, res, next) {
  try {
    const user = await User.findBy({ username: req.body.username });
    if (!user) {
      res.status(401).json({ message: "invalid credentials" });
    } else req.dbUser = user;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkCred,
  uniqueUsername,
  usernameExists,
};
