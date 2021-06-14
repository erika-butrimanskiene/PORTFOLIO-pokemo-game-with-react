const User = require('./userModel');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  let user = new User(req.body);
  let randomAvatars = [
    '001-aaron.png',
    '002-avatar.png',
    '003-avatar.png',
    '004-avatar.png',
    '005-avatar.png',
    '006-avatar.png',
    '008-avatar.png',
    '009-avatar.png',
    '013-avatar.png',
    '014-avatar.png',
    '015-avatar.png',
    '016-avatar.png',
    '020-avatar.png',
    '021-avatar.png',
    '022-avatar.png',
  ];

  let randomNumber = Math.floor(Math.random() * 15);
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

const getUsers = async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  } catch (e) {
    res.status(401).json(e);
  }
};

const getUserByUsername = async (req, res) => {
  let userName = req.params.username;
  try {
    let userByUsername = await User.findOne({
      username: userName,
    });
    res.json(userByUsername);
  } catch (e) {
    res.status(400).json(e);
  }
};

const updateUser = async (req, res) => {
  let userId = req.params.id;
  try {
    let updatedUser = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      req.body
    );
    await res.json(updatedUser);
  } catch {
    res.status(404).json(err);
  }
};

module.exports = {
  signUp,
  login,
  getUser,
  getUsers,
  getUserByUsername,
  updateUser,
};
