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
exports.verifyAgency =
  exports.verifySuperAmdin =
  exports.verifyAuth =
  exports.verifyUser =
  exports.verifyAdmin =
    void 0;
const config_1 = __importDefault(require('../config'));
const client_1 = require('@prisma/client');
const jwtHelpers_1 = require('../helpers/jwtHelpers');
const prisma = new client_1.PrismaClient();
const verifyAuthWithRole = allowedRoles => {
  return (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      var _a, _b;
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      try {
        const decoded = jwtHelpers_1.jwtHelpers.verifyToken(
          token,
          config_1.default.jwt.jwt_access_secret
        );
        req.user = decoded;
        if (!decoded.userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        const isUserExist = yield prisma.users.findUnique({
          where: {
            id:
              (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.userId,
          },
        });
        if (
          !isUserExist ||
          !allowedRoles.includes(
            (_b = req.user) === null || _b === void 0 ? void 0 : _b.role
          )
        ) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
      } catch (error) {
        next(error);
      }
    });
};
const verifyAuth = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwtHelpers_1.jwtHelpers.verifyToken(
        token,
        config_1.default.jwt.jwt_access_secret
      );
      req.user = decoded;
      if (!decoded.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const isUserExist = yield prisma.users.findUnique({
        where: {
          id:
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
              null || _a === void 0
              ? void 0
              : _a.userId,
        },
      });
      if (!isUserExist) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    } catch (error) {
      next(error);
    }
  });
exports.verifyAuth = verifyAuth;
const verifyAdmin = verifyAuthWithRole(['admin', 'super_admin']);
exports.verifyAdmin = verifyAdmin;
const verifySuperAmdin = verifyAuthWithRole(['super_admin']);
exports.verifySuperAmdin = verifySuperAmdin;
const verifyUser = verifyAuthWithRole(['user']);
exports.verifyUser = verifyUser;
const verifyAgency = verifyAuthWithRole(['agency']);
exports.verifyAgency = verifyAgency;
