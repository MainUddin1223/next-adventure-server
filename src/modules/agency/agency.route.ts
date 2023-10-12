import express from 'express';
import { verifyAgency, verifyAuth } from '../../middlewares/verifyAuth';
import { agencyController } from './agency.controller';

const router = express.Router();

router.route('/plans').get(verifyAuth, agencyController.getTourPlans);
router.route('/create-plan').post(verifyAgency, agencyController.createPlan);
router
  .route('/plan/:id')
  .get(verifyAuth, agencyController.getTourPlanById)
  .patch(verifyAgency, agencyController.updateTourPlan)
  .delete(verifyAgency, agencyController.deleteTourPlan);

export default { agencyRouter: router };
