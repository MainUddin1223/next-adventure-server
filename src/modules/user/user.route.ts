import express from 'express';
import { verifyAuth } from '../../middlewares/verifyAuth';
import { userController } from './user.controller';

const router = express.Router();

router.route('/book-plan').post(verifyAuth, userController.bookPlan);
router.route('/agency-plans').get(userController.getplansAndAgencies);
router.route('/agencies').get(userController.getAgencies);
router.route('/tour-plans').get(userController.getTourPlans);
router.route('/agency/:id').get(verifyAuth, userController.getAgencyById);
router.route('/plan-details/:id').get(userController.getTourPlanById);

export default { userRouter: router };
