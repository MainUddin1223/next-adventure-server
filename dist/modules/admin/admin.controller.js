"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const catchAsync_1 = __importDefault(require("../../errorHandlers/catchAsync"));
const pagination_1 = require("../../utils/pagination");
const sendRespnse_1 = __importDefault(require("../../utils/sendRespnse"));
const http_status_codes_1 = require("http-status-codes");
const pick_1 = __importDefault(require("../../utils/pick"));
const user_constant_1 = require("../user/user.constant");
const admin_service_1 = require("./admin.service");
const admin_constant_1 = require("./admin.constant");
const getAgencies = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = yield (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(req.query, user_constant_1.agencyFilterOptons);
    const result = yield admin_service_1.adminService.getAllAgencies(paginationOptions, filter);
    (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Data retrieved successfully',
        data: result,
    });
}));
const getAllAdmins = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = yield (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(req.query, user_constant_1.agencyFilterOptons);
    const result = yield admin_service_1.adminService.getAllAdmins(paginationOptions, filter);
    (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Data retrieved successfully',
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = yield (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(req.query, user_constant_1.agencyFilterOptons);
    const result = yield admin_service_1.adminService.getAllUsers(paginationOptions, filter);
    (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Data retrieved successfully',
        data: result,
    });
}));
const getTourPlans = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = yield (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(req.query, user_constant_1.agencyFilterOptons);
    const result = yield admin_service_1.adminService.getAllTourPlan(paginationOptions, filter);
    (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Data retrieved successfully',
        data: result,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = yield (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(req.query, admin_constant_1.bookingHistoryFilterOptions);
    const result = yield admin_service_1.adminService.getAllBookings(paginationOptions, filter);
    (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Data retrieved successfully',
        data: result,
    });
}));
const getPayouts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = yield (0, pagination_1.pagination)(req.query);
    const filter = (0, pick_1.default)(req.query, admin_constant_1.bookingHistoryFilterOptions);
    const result = yield admin_service_1.adminService.getPayouts(paginationOptions, filter);
    (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Data retrieved successfully',
        data: result,
    });
}));
const relaseAgencyPayout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield admin_service_1.adminService.relaseAgencyPayout(id);
    (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Data retrieved successfully',
        data: result,
    });
}));
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield admin_service_1.adminService.createAdmin(id, req.body.role);
    (0, sendRespnse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Admin created successfully',
        data: result,
    });
}));
exports.adminController = {
    getAgencies,
    getTourPlans,
    getAllBookings,
    getPayouts,
    relaseAgencyPayout,
    createAdmin,
    getAllAdmins,
    getAllUsers,
};
