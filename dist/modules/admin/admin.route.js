'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const verifyAuth_1 = require('../../middlewares/verifyAuth');
const admin_controller_1 = require('./admin.controller');
const router = express_1.default.Router();
router
  .route('/agencies')
  .get(
    verifyAuth_1.verifyAdmin,
    admin_controller_1.adminController.getAgencies
  );
router
  .route('/tour-plans')
  .get(
    verifyAuth_1.verifyAdmin,
    admin_controller_1.adminController.getTourPlans
  );
router
  .route('/booking-history')
  .get(
    verifyAuth_1.verifyAdmin,
    admin_controller_1.adminController.getAllBookings
  );
router.route('/payouts').get(admin_controller_1.adminController.getPayouts);
router
  .route('/payouts/:id')
  .patch(admin_controller_1.adminController.relaseAgencyPayout);
exports.default = { adminRouter: router };
