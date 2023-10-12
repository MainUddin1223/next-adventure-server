import express from 'express';
import { authController } from './auth.controller';
import { verifyAuth } from '../../middlewares/verifyAuth';

const router = express.Router();

router.route('/signup').post(authController.registerUser);
router.route('/signin').post(authController.signin);
router.route('/signout').post(verifyAuth, authController.signOut);

export default { authRouter: router };
