'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const verifyAuth_1 = require('../../middlewares/verifyAuth');
const user_controller_1 = require('./user.controller');
const router = express_1.default.Router();
router
  .route('/book-plan')
  .post(verifyAuth_1.verifyAuth, user_controller_1.userController.bookPlan);
router
  .route('/upcoming-schedules')
  .get(
    verifyAuth_1.verifyUser,
    user_controller_1.userController.getUpcomingSchedules
  );
router
  .route('/manage-booking/:id')
  .patch(
    verifyAuth_1.verifyUser,
    user_controller_1.userController.manageBookings
  );
router
  .route('/agency-plans')
  .get(user_controller_1.userController.getplansAndAgencies);
router.route('/agencies').get(user_controller_1.userController.getAgencies);
router.route('/tour-plans').get(user_controller_1.userController.getTourPlans);
router
  .route('/agency/:id')
  .get(verifyAuth_1.verifyAuth, user_controller_1.userController.getAgencyById);
router
  .route('/plan-details/:id')
  .get(user_controller_1.userController.getTourPlanById);
router
  .route('/booking-history')
  .get(
    verifyAuth_1.verifyUser,
    user_controller_1.userController.getAllBookings
  );
router
  .route('/review')
  .post(verifyAuth_1.verifyUser, user_controller_1.userController.leaveReview);
exports.default = { userRouter: router };
