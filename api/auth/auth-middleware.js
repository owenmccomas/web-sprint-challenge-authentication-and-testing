const User = require("./auth-model");

function checkCredentials(req, res, next) {
  if (
    !req.body.username || !req.body.username.trim() || !req.body.password || !req.body.password.trim()
  ) {
    return next(
        res
        .status(400)
        .json({ message: 'username and password required' })
    )
  } else

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
  checkCredentials,
  uniqueUsername,
  usernameExists,
};
