const router = require('express').Router();

// Controllers
const UserController = require('../user/userController');

// Middlewares
const UserMiddleware = require('../user/middleWare');

// User routes
router.post(
  '/user/signup',
  UserMiddleware.signUpValidations,
  UserController.signUp
);
router.post(
  '/user/login',
  UserMiddleware.loginValidations,
  UserController.login
);

router.get('/user', UserMiddleware.authenticate, UserController.getUser);
router.patch(
  '/user/:id',
  UserMiddleware.authenticate,
  UserController.updateUser
);

router.get('/users', UserController.getUsers);
router.get('/users/:username', UserController.getUserByUsername);

// Export
module.exports = router;
