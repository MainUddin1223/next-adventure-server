import express from 'express';
import { verifyUser } from '../../middlewares/verifyAuth';
import { userController } from './user.controller';

const router = express.Router();

router.route('/book-plan').post(verifyUser, userController.bookPlan);

export default { userRouter: router };
