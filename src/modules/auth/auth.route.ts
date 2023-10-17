import express from 'express';
import { authController } from './auth.controller';
import { verifyAuth } from '../../middlewares/verifyAuth';

const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/register-agency').post(authController.registerAgency);
router.route('/signin').post(authController.signin);
router.route('/profile').get(verifyAuth, authController.getProfile);
router.route('/signout').post(verifyAuth, authController.signOut);
router.route('/profile/update').patch(verifyAuth, authController.updateProfile);
router.route('/signout').post(verifyAuth, authController.signOut);

export default { authRouter: router };
