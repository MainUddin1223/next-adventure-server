'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require('../../errorHandlers/catchAsync'));
const agency_service_1 = require('../agency/agency.service');
const sendRespnse_1 = __importDefault(require('../../utils/sendRespnse'));
const http_status_codes_1 = require('http-status-codes');
const user_service_1 = require('./user.service');
const pagination_1 = require('../../utils/pagination');
const pick_1 = __importDefault(require('../../utils/pick'));
const user_constant_1 = require('./user.constant');
const getTourPlanById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield agency_service_1.agencyService.getTourPlanById(
      id,
      null
    );
    (0, sendRespnse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Plan retrieved successfully',
      data: result,
    });
  })
);
const bookPlan = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = {
      userId:
        (_a = req === null || req === void 0 ? void 0 : req.user) === null ||
        _a === void 0
          ? void 0
          : _a.userId,
      planId: req.body.planId,
      quantity: req.body.quantity,
    };
    const result = yield user_service_1.userService.bookTourPlan(payload);
    (0, sendRespnse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Plan booked successfully',
      data: result,
    });
  })
);
const getplansAndAgencies = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getTourPlanAndAgency();
    (0, sendRespnse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Data retrieved successfully',
      data: result,
    });
  })
);
const getAgencies = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = yield (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(
      req.query,
      user_constant_1.agencyFilterOptons
    );
    const result = yield user_service_1.userService.getAgencies(
      paginationOptions,
      filter
    );
    (0, sendRespnse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Data retrieved successfully',
      data: result,
    });
  })
);
const getTourPlans = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = yield (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(
      req.query,
      user_constant_1.tourPlanFilterOptions
    );
    const result = yield user_service_1.userService.getTourPlans(
      paginationOptions,
      filter
    );
    (0, sendRespnse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Data retrieved successfully',
      data: result,
    });
  })
);
const getAgencyById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield user_service_1.userService.getAgencyById(id);
    (0, sendRespnse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Data retrieved successfully',
      data: result,
    });
  })
);
exports.userController = {
  getTourPlanById,
  bookPlan,
  getplansAndAgencies,
  getAgencies,
  getTourPlans,
  getAgencyById,
};
