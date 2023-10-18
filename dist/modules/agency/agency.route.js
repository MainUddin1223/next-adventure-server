'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const verifyAuth_1 = require('../../middlewares/verifyAuth');
const agency_controller_1 = require('./agency.controller');
const router = express_1.default.Router();
router
  .route('/plans')
  .get(
    verifyAuth_1.verifyAuth,
    agency_controller_1.agencyController.getTourPlans
  );
router
  .route('/create-plan')
  .post(
    verifyAuth_1.verifyAgency,
    agency_controller_1.agencyController.createPlan
  );
router
  .route('/plan/:id')
  .get(
    verifyAuth_1.verifyAuth,
    agency_controller_1.agencyController.getTourPlanById
  )
  .patch(
    verifyAuth_1.verifyAgency,
    agency_controller_1.agencyController.updateTourPlan
  )
  .delete(
    verifyAuth_1.verifyAgency,
    agency_controller_1.agencyController.deleteTourPlan
  );
exports.default = { agencyRouter: router };
