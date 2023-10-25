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
exports.authController = void 0;
const catchAsync_1 = __importDefault(require('../../errorHandlers/catchAsync'));
const auth_service_1 = require('./auth.service');
const sendRespnse_1 = __importDefault(require('../../utils/sendRespnse'));
const http_status_codes_1 = require('http-status-codes');
const auth_validation_1 = require('./auth.validation');
const signUp = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield auth_validation_1.signUpValidateSchema.validate(
      req.body
    );
    if (error) {
      (0, sendRespnse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message: 'Sign up failed',
        data: error.details,
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      (0, sendRespnse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message: 'Confirm password mismatch!',
        data: '',
      });
    } else {
      delete req.body.confirmPassword;
      const result = yield auth_service_1.authService.createUser(req.body);
      (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Signup successful',
        data: result,
      });
    }
  })
);
const registerAgency = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { error } = yield auth_validation_1.registerValidateSchema.validate(
      req.body
    );
    if (error) {
      (0, sendRespnse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message: 'Registration failed',
        data: error.details,
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      (0, sendRespnse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message: 'Confirm password mismatch!',
        data: '',
      });
    } else {
      delete req.body.confirmPassword;
      const result = yield auth_service_1.authService.registerAgency(req.body);
      (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Registration successful',
        data: result,
      });
    }
  })
);
const signin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield auth_validation_1.signinValidateSchema.validate(
      req.body
    );
    if (error) {
      (0, sendRespnse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message: 'Sign in failed',
        data: error.details,
      });
    } else {
      const result = yield auth_service_1.authService.signin(req.body);
      (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Successfully sign in',
        data: result,
      });
    }
  })
);
const getProfile = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId =
      (_a = req === null || req === void 0 ? void 0 : req.user) === null ||
      _a === void 0
        ? void 0
        : _a.userId;
    const { error } = yield auth_validation_1.validateUpdateSchema.validate(
      req.body
    );
    if (error) {
      (0, sendRespnse_1.default)(res, {
        statusCode:
          http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message: 'Registration failed',
        data: error.details,
      });
    } else {
      const result = yield auth_service_1.authService.getProfile(userId);
      (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Profile fatched successfully',
        data: result,
      });
    }
  })
);
const updateProfile = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId =
      (_b = req === null || req === void 0 ? void 0 : req.user) === null ||
      _b === void 0
        ? void 0
        : _b.userId;
    const result = yield auth_service_1.authService.updateProfile(
      req.body,
      userId
    );
    (0, sendRespnse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Profile fatched successfully',
      data: result,
    });
  })
);
const signOut = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const result = yield auth_service_1.authService.signOut(
      (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId
    );
    (0, sendRespnse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'Registration successful',
      data: result,
    });
  })
);
exports.authController = {
  signUp,
  signin,
  signOut,
  getProfile,
  updateProfile,
  registerAgency,
};
