const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  username: {
    type: String,
    min: 4,
    max: 20,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 4,
    max: 20,
    required: true,
  },
  passwordSecond: {
    type: String,
    min: 4,
    max: 20,
  },
  health: {
    type: Number,
    default: 100,
  },
  gold: {
    type: Number,
    default: 100,
  },
  inventory: {
    type: Array,
    default: [],
  },
  sessionTokens: [
    {
      token: String,
    },
  ],
});

// PASSWORD hashing
UserSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password') && user.isModified('passwordSecond')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(
        user.password && user.passwordSecond,
        salt,
        (err, hassedPassword) => {
          user.password = hassedPassword;
          user.passwordSecond = hassedPassword;
          next();
        }
      );
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
