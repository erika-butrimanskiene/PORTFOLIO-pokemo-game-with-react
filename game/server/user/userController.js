const User = require('./userModel');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  let user = new User(req.body);
  let randomAvatars = [
    '001-avatar.png',
    '002-avatar.png',
    '003-avatar.png',
    '004-avatar.png',
    '005-avatar.png',
  ];

  let randomNumber = Math.floor(Math.random() * 5);
  try {
    user.image = randomAvatars[randomNumber];
    let createdUser = await user.save();
    res.json({ createdUser, success: true, msg: 'User created successfully.' });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    // Create JWT Token from User._id and add to User
    let token = await jwt
      .sign({ _id: user._id.toHexString() }, 'gameSuperSecret')
      .toString();
    user.sessionTokens.push({ token });
    await user.save();
    // Send response with token in headers
    res.header('game-token', token).json(user);
  } catch (err) {
    res.status(401).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    let user = req.user;
    res.json(user);
  } catch (e) {
    res.status(401).json(e);
  }
};

module.exports = {
  signUp,
  login,
  getUser,
};
