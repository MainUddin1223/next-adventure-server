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
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonGetAllUserQuery = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const commonGetAllUserQuery = (meta, filterOptions, role) => __awaiter(void 0, void 0, void 0, function* () {
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
    console.log(meta);
    const result = yield prisma.users.findMany({
        skip,
        take,
        orderBy,
        where: Object.assign(Object.assign({}, queryOption), { role }),
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            contact_no: true,
            profile_img: true,
            rating: true,
            is_featured: true,
            about_user: true,
            createdAt: true,
            updatedAt: true,
            plans: true,
            booking_history: true,
            payout_history: true,
        },
    });
    const totalCount = yield prisma.users.count({
        where: {
            role,
        },
    });
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
        result,
        meta: { page: page, size: take, total: totalCount, totalPage },
    };
});
exports.commonGetAllUserQuery = commonGetAllUserQuery;
