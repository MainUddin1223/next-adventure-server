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
exports.authService = void 0;
const client_1 = require('@prisma/client');
const bcrypt_1 = __importDefault(require('bcrypt'));
const apiError_1 = __importDefault(require('../../errorHandlers/apiError'));
const http_status_1 = __importDefault(require('http-status'));
const http_status_codes_1 = require('http-status-codes');
const jwtHelpers_1 = require('../../helpers/jwtHelpers');
const config_1 = __importDefault(require('../../config'));
const auth_utils_1 = require('./auth.utils');
const prisma = new client_1.PrismaClient();
const createUser = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const hash = bcrypt_1.default.hashSync(payload.password, 10);
    const data = Object.assign(Object.assign({}, payload), { password: hash });
    const result = yield prisma.users.create({
      data,
    });
    const accessData = { role: result.role, userId: result.id };
    const accessToken = yield jwtHelpers_1.jwtHelpers.createToken(
      accessData,
      config_1.default.jwt.jwt_access_secret,
      config_1.default.jwt.expires_in,
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expires_in
    );
    const userData = yield auth_utils_1.authUtils.getUserData(result.id);
    return { result: userData, accessToken };
  });
const signin = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!isUserExist) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        'Something went wrong'
      );
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(
      data.password,
      isUserExist.password
    );
    if (!isPasswordMatched) {
      throw new apiError_1.default(
        http_status_1.default.INTERNAL_SERVER_ERROR,
        'Something went wrong'
      );
    }
    const payload = { role: isUserExist.role, userId: isUserExist.id };
    const accessToken = yield jwtHelpers_1.jwtHelpers.createToken(
      payload,
      config_1.default.jwt.jwt_access_secret,
      config_1.default.jwt.expires_in,
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expires_in
    );
    if (isUserExist.role === 'admin' || isUserExist.role === 'super_admin') {
      const userData = yield auth_utils_1.authUtils.getAdminData(
        isUserExist.id
      );
      return { result: userData, accessToken };
    } else if (isUserExist.role === 'agency') {
      const userData = yield auth_utils_1.authUtils.getAgencyData(
        isUserExist.id
      );
      return { result: userData, accessToken };
    } else {
      const userData = yield auth_utils_1.authUtils.getUserData(isUserExist.id);
      return { result: userData, accessToken };
    }
  });
const signOut = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.users.update({
      where: {
        id,
      },
      data: {
        refresh_token: null,
      },
    });
    return { message: 'Succssfully logout' };
  });
const getProfile = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        first_name: true,
        last_name: true,
        profile_img: true,
        email: true,
        about_user: true,
        contact_no: true,
      },
    });
    return result;
  });
const updateProfile = (data, id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.users.update({
      where: {
        id,
      },
      data,
    });
    return result;
  });
exports.authService = {
  createUser,
  signin,
  signOut,
  getProfile,
  updateProfile,
};
