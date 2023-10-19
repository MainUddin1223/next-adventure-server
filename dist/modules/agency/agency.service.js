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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agencyService = void 0;
const client_1 = require("@prisma/client");
const apiError_1 = __importDefault(require("../../errorHandlers/apiError"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const createPlan = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.plans.create({
        data,
    });
    return result;
});
const getPlans = (meta, filterOptions, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
        const { search, max_price, min_price } = filterOptions, restOptions = __rest(filterOptions, ["search", "max_price", "min_price"]);
        if (search) {
            queryOption['OR'] = [
                {
                    plan_name: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    starting_location: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ];
        }
        if (max_price || min_price) {
            if (max_price) {
                const price = { lte: max_price };
                queryOption['price'] = price;
            }
            if (min_price) {
                const price = { gte: min_price };
                queryOption['price'] = price;
            }
        }
        Object.entries(restOptions).forEach(([field, value]) => {
            queryOption[field] = value;
        });
    }
    const result = yield prisma.plans.findMany({
        skip: Number(skip),
        take,
        orderBy,
        where: {
            agency_id: id,
        },
    });
    const totalCount = yield prisma.plans.count();
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
        result,
        meta: { page: page, size: take, total: totalCount, totalPage },
    };
});
const getTourPlanById = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user && (user === null || user === void 0 ? void 0 : user.role) == 'agency') {
        const result = yield prisma.plans.findFirst({
            where: {
                id,
                agency_id: user.userId,
            },
            include: {
                Payout_history: true,
                booking_history: true,
            },
        });
        return result;
    }
    const result = yield prisma.plans.findUnique({
        where: {
            id,
        },
        select: {
            plan_name: true,
            id: true,
            starting_location: true,
            starting_time: true,
            price: true,
            tour_duration: true,
            cover_location: true,
            total_meals: true,
            description: true,
            booking_deadline: true,
            events: true,
            users: {
                select: {
                    first_name: true,
                    last_name: true,
                    id: true,
                    rating: true,
                    profile_img: true,
                },
            },
        },
    });
    return result;
});
const updateTourPlan = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.plans.update({
        where: {
            id: data.id,
            agency_id: id,
        },
        data,
    });
    return result;
});
const deleteTourPlan = (plan_id, agency_id) => __awaiter(void 0, void 0, void 0, function* () {
    const planBooked = yield prisma.bookingHistory.count({
        where: {
            plan_id,
        },
    });
    if (planBooked > 0) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Your tour plan already booked by user.So you can not delete this plan');
    }
    const result = yield prisma.plans.delete({
        where: {
            id: plan_id,
            agency_id,
        },
    });
    return result;
});
const getBookingHistoryById = (id, agency_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.plans.findFirst({
        where: {
            id,
            agency_id,
        },
        select: {
            id: true,
            plan_name: true,
            booking_history: true,
        },
    });
    return result;
});
const manageBookings = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookingHistory = yield prisma.bookingHistory.findFirst({
        where: {
            id: payload.bookingHistoryId,
            status: {
                not: payload.status,
            },
            plan: {
                agency_id: payload.agencyId,
            },
        },
    });
    if (!isBookingHistory) {
        throw new apiError_1.default(404, 'Record not found');
    }
    const result = yield prisma.bookingHistory.update({
        where: {
            id: payload.bookingHistoryId,
        },
        data: {
            status: payload.status,
        },
    });
    if (result) {
        return result;
    }
    throw new apiError_1.default(404, 'Booking record not found');
});
exports.agencyService = {
    createPlan,
    getPlans,
    getTourPlanById,
    updateTourPlan,
    deleteTourPlan,
    getBookingHistoryById,
    manageBookings,
};
