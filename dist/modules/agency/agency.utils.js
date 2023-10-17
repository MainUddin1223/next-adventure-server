"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlanByRoleQuery = void 0;
const getPlanByRoleQuery = (user, queryOption) => {
    if ((user === null || user === void 0 ? void 0 : user.role) === 'agency') {
        const queries = {
            where: Object.assign({ agency_id: user.userId }, queryOption),
            include: {
                booking_history: true,
            },
        };
        return queries;
    }
    if (!(user === null || user === void 0 ? void 0 : user.role) || (user === null || user === void 0 ? void 0 : user.role) === 'user') {
        const queries = {
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
        };
        return queries;
    }
};
exports.getPlanByRoleQuery = getPlanByRoleQuery;
