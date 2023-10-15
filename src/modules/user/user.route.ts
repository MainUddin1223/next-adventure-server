import express from 'express';
import { verifyUser } from '../../middlewares/verifyAuth';
import { userController } from './user.controller';

const router = express.Router();

router.route('/book-plan').post(verifyUser, userController.bookPlan);
router.route('/agency-plans').get(userController.getplansAndAgencies);
router.route('/agencies').get(userController.getAgencies);
router.route('/tour-plans').get(userController.getTourPlans);
router.route('/agency/:id').get(verifyUser, userController.getAgencyById);

export default { userRouter: router };
