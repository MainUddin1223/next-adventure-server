import express from 'express';
import { verifyAdmin } from '../../middlewares/verifyAuth';
import { adminController } from './admin.controller';

const router = express.Router();

router.route('/agencies').get(verifyAdmin, adminController.getAgencies);
router.route('/tour-plans').get(verifyAdmin, adminController.getTourPlans);
router
  .route('/booking-history')
  .get(verifyAdmin, adminController.getAllBookings);
router.route('/payouts').get(adminController.getPayouts);

export default { adminRouter: router };
