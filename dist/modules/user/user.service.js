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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const apiError_1 = __importDefault(require("../../errorHandlers/apiError"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const bookTourPlan = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //!Payment need to be implemented
    const { userId, planId, quantity } = payload;
    console.log(payload);
    const getPlan = yield prisma.plans.findFirst({
        where: {
            id: planId,
            booking_deadline: {
                gt: new Date(),
            },
        },
    });
    if (!getPlan) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Your reqested plan in not available');
    }
    const calculateAmount = Number(getPlan.price) * quantity;
    const bookingData = {
        quantity,
        user_id: userId,
        plan_id: planId,
        total_amount: calculateAmount,
    };
    const createBooking = yield prisma.bookingHistory.create({
        data: bookingData,
    });
    const insetIntoPayouts = yield prisma.payoutHistory.create({
        data: {
            plan_id: planId,
            agency_id: getPlan.agency_id,
            amount: calculateAmount,
            quantity,
        },
    });
    console.log(insetIntoPayouts);
    return createBooking;
});
const getTourPlanAndAgency = () => __awaiter(void 0, void 0, void 0, function* () {
    const tourPlans = yield prisma.plans.findMany({
        take: 5,
        select: {
            id: true,
            plan_name: true,
            images: true,
            price: true,
            starting_time: true,
            starting_location: true,
        },
    });
    const agencies = yield prisma.users.findMany({
        take: 5,
        where: {
            role: 'agency',
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_img: true,
        },
    });
    return { tourPlans, agencies };
});
const getAgencies = (meta, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
        const { search } = filterOptions, restOptions = __rest(filterOptions, ["search"]);
        if (search) {
            queryOption['OR'] = [
                {
                    first_name: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    last_name: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ];
        }
        Object.entries(restOptions).forEach(([field, value]) => {
            queryOption[field] = value;
        });
    }
    const result = yield prisma.users.findMany({
        skip,
        take,
        orderBy,
        where: Object.assign(Object.assign({}, queryOption), { role: 'agency' }),
        select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_img: true,
        },
    });
    const totalCount = yield prisma.users.count({
        where: {
            role: 'agency',
        },
    });
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
        result,
        meta: { page: page, size: take, total: totalCount, totalPage },
    };
});
const getTourPlans = (meta, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
        skip,
        take,
        orderBy,
        where: Object.assign({}, queryOption),
        select: {
            plan_name: true,
            id: true,
            starting_location: true,
            starting_time: true,
            price: true,
            users: {
                select: {
                    first_name: true,
                    last_name: true,
                    id: true,
                },
            },
        },
    });
    const totalCount = yield prisma.users.count({
        where: {
            role: 'agency',
        },
    });
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
        result,
        meta: { page: page, size: take, total: totalCount, totalPage },
    };
});
const getAgencyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.users.findFirst({
        where: {
            id,
            role: 'agency',
        },
        select: {
            first_name: true,
            last_name: true,
            contact_no: true,
            profile_img: true,
            rating: true,
            about_user: true,
            plans: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 5,
                select: {
                    id: true,
                    plan_name: true,
                    images: true,
                    price: true,
                    starting_location: true,
                },
            },
        },
    });
    return result;
});
exports.userService = {
    bookTourPlan,
    getTourPlanAndAgency,
    getAgencies,
    getTourPlans,
    getAgencyById,
};
