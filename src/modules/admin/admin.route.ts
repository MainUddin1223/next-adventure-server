import express from 'express';
import { verifyAdmin, verifySuperAmdin } from '../../middlewares/verifyAuth';
import { adminController } from './admin.controller';

const router = express.Router();

router.route('/agencies').get(verifyAdmin, adminController.getAgencies);
router.route('/users').get(verifyAdmin, adminController.getAllUsers);
router.route('/admins').get(verifySuperAmdin, adminController.getAllAdmins);
router.route('/tour-plans').get(verifyAdmin, adminController.getTourPlans);
router
  .route('/booking-history')
  .get(verifyAdmin, adminController.getAllBookings);
router.route('/payouts').get(adminController.getPayouts);
router.route('/payouts/:id').patch(adminController.relaseAgencyPayout);
router
  .route('/create-admin/:id')
  .patch(verifySuperAmdin, adminController.createAdmin);

export default { adminRouter: router };
