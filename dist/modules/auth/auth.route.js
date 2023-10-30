'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const auth_controller_1 = require('./auth.controller');
const verifyAuth_1 = require('../../middlewares/verifyAuth');
const router = express_1.default.Router();
router.route('/signup').post(auth_controller_1.authController.signUp);
router
  .route('/register-agency')
  .post(auth_controller_1.authController.registerAgency);
router.route('/signin').post(auth_controller_1.authController.signin);
router
  .route('/profile')
  .get(verifyAuth_1.verifyAuth, auth_controller_1.authController.getProfile);
router
  .route('/signout')
  .post(verifyAuth_1.verifyAuth, auth_controller_1.authController.signOut);
router
  .route('/profile/update')
  .patch(
    verifyAuth_1.verifyAuth,
    auth_controller_1.authController.updateProfile
  );
router
  .route('/signout')
  .post(verifyAuth_1.verifyAuth, auth_controller_1.authController.signOut);
exports.default = { authRouter: router };
