const jwt = require('jsonwebtoken');
const User = require('./userModel');
const bcrypt = require('bcrypt');

const authenticate = async (req, res, next) => {
  let token = req.header('game-token');
  try {
    // Verify JWT
    let decodedId = await jwt.verify(token, 'gameSuperSecret');
    let authenticatedUser = await User.findOne({
      _id: decodedId._id,
      'sessionTokens.token': token,
    });
    if (!authenticatedUser) throw 'Authentication failed';
    req.user = authenticatedUser;
    req.token = token;
    next();
  } catch (err) {
    err = err.message == 'jwt malformed' ? 'Wrong session token' : err;
    res.status(401).json(err);
  }
};

const signUpValidations = async (req, res, next) => {
  try {
    const regex = /\d/;
    let userName = req.body.username;
    let userPassword = req.body.password;
    let userSecondPassword = req.body.passwordSecond;
    let alreadyExist = await User.findOne({ username: userName });
    let passwordHasNumber = regex.test(userPassword);
    if (alreadyExist) throw 'Username already exist.';
    if (userName.length < 4 || userName.length > 20)
      throw 'Username max length 20, min length 4.';
    if (
      userPassword.length < 4 ||
      userPassword.length > 20 ||
      passwordHasNumber === false
    )
      throw 'Password max length 20, min length 4, should include at least one number.';
    if (userPassword !== userSecondPassword) throw 'Passwords should match.';
    next();
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};

const loginValidations = async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) throw "User doesn't exist.";
    // Check password
    let passwordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatched) throw 'Incorrect password.';
    next();
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};

const editUserProfileValidations = async (req, res, next) => {
  try {
    let userName = req.body.username;
    let alreadyExist = await User.findOne({ username: userName });

    if (alreadyExist) {
      if (alreadyExist._id != req.body._id) {
        throw 'Username already exist.';
      }
    }
    if (userName.length < 4 || userName.length > 20)
      throw 'Username max length 20, min length 4.';
    next();
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};

module.exports = {
  authenticate,
  signUpValidations,
  loginValidations,
  editUserProfileValidations,
};
