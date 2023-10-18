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
exports.agencyController = void 0;
const catchAsync_1 = __importDefault(require('../../errorHandlers/catchAsync'));
const sendRespnse_1 = __importDefault(require('../../utils/sendRespnse'));
const http_status_codes_1 = require('http-status-codes');
const agency_service_1 = require('./agency.service');
const agency_validate_1 = require('./agency.validate');
const pagination_1 = require('../../utils/pagination');
const pick_1 = __importDefault(require('../../utils/pick'));
const agency_constants_1 = require('./agency.constants');
const createPlan = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { error } = yield agency_validate_1.createPlanSchema.validate(
      req.body
    );
    if (error) {
      (0, sendRespnse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message: 'Fail to create plan',
        data: error.details,
      });
    } else {
      const planPayload = Object.assign(Object.assign({}, req.body), {
        agency_id:
          (_a = req === null || req === void 0 ? void 0 : req.user) === null ||
          _a === void 0
            ? void 0
            : _a.userId,
      });
      const result = yield agency_service_1.agencyService.createPlan(
        planPayload
      );
      (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Plan created successfully',
        data: result,
      });
    }
  })
);
const getTourPlans = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = yield (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(
      req.query,
      agency_constants_1.planFilters
    );
    const result = yield agency_service_1.agencyService.getPlans(
      paginationOptions,
      filter,
      req === null || req === void 0 ? void 0 : req.user
    );
    (0, sendRespnse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Plans fetched successfully',
      data: result,
    });
  })
);
const getTourPlanById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield agency_service_1.agencyService.getTourPlanById(
      id,
      req.user
    );
    (0, sendRespnse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Plan retrieved successfylly',
      data: result,
    });
  })
);
const updateTourPlan = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { error } = yield agency_validate_1.updatePlanSchema.validate(
      req.body
    );
    if (error) {
      (0, sendRespnse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message: 'Fail to update the plan',
        data: error.details,
      });
    } else {
      const id = Number(req.params.id);
      const result = yield agency_service_1.agencyService.updateTourPlan(
        Object.assign(Object.assign({}, req.body), { id }),
        (_b = req === null || req === void 0 ? void 0 : req.user) === null ||
          _b === void 0
          ? void 0
          : _b.userId
      );
      (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Plan updated successfylly',
        data: result,
      });
    }
  })
);
const deleteTourPlan = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = Number(req.params.id);
    const result = yield agency_service_1.agencyService.deleteTourPlan(
      id,
      (_c = req === null || req === void 0 ? void 0 : req.user) === null ||
        _c === void 0
        ? void 0
        : _c.userId
    );
    (0, sendRespnse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Plan updated successfylly',
      data: result,
    });
  })
);
exports.agencyController = {
  createPlan,
  getTourPlans,
  getTourPlanById,
  updateTourPlan,
  deleteTourPlan,
};
