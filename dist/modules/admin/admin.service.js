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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.adminService = void 0;
const client_1 = require('@prisma/client');
const prisma = new client_1.PrismaClient();
const getAllAgencies = (meta, filterOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
      const { search } = filterOptions,
        restOptions = __rest(filterOptions, ['search']);
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
        role: 'agency',
      },
    });
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
      result,
      meta: { page: page, size: take, total: totalCount, totalPage },
    };
  });
const getAllTourPlan = (meta, filterOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
      const { search } = filterOptions,
        restOptions = __rest(filterOptions, ['search']);
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
        id: true,
        plan_name: true,
        starting_time: true,
        price: true,
        is_featured: true,
        booking_deadline: true,
        users: {
          select: {
            first_name: true,
            last_name: true,
            id: true,
            email: true,
          },
        },
      },
    });
    const totalCount = yield prisma.plans.count({});
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
      result,
      meta: { page: page, size: take, total: totalCount, totalPage },
    };
  });
const getAllBookings = (meta, filterOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
      const { search } = filterOptions,
        restOptions = __rest(filterOptions, ['search']);
      if (search) {
        queryOption['OR'] = [
          {
            plan: {
              plan_name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ];
      }
      Object.entries(restOptions).forEach(([field, value]) => {
        queryOption[field] = value;
      });
    }
    const result = yield prisma.bookingHistory.findMany({
      skip,
      take,
      orderBy,
      where: Object.assign({}, queryOption),
      select: {
        id: true,
        status: true,
        total_amount: true,
        quantity: true,
        createdAt: true,
        user: {
          select: {
            first_name: true,
            last_name: true,
            id: true,
            email: true,
          },
        },
        plan: {
          select: {
            plan_name: true,
            booking_deadline: true,
          },
        },
      },
    });
    const totalCount = yield prisma.bookingHistory.count({});
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
      result,
      meta: { page: page, size: take, total: totalCount, totalPage },
    };
  });
const getPayouts = (meta, filterOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy, page } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
      const { search } = filterOptions,
        restOptions = __rest(filterOptions, ['search']);
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
    const agencies = yield prisma.users.findMany({
      skip,
      take,
      orderBy,
      where: Object.assign({ role: 'agency' }, queryOption),
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        payout_history: {
          where: {
            plan: {
              booking_deadline: {
                gt: new Date(),
              },
            },
          },
          select: {
            plan_id: true,
            status: true,
            quantity: true,
            amount: true,
            plan: {
              select: {
                plan_name: true,
              },
            },
          },
        },
      },
    });
    const result = agencies.map(agency => {
      const payoutByStatus = agency.payout_history.reduce((acc, payout) => {
        const { status, quantity, amount } = payout;
        if (!acc[status]) {
          acc[status] = { status, totalQuantity: 0, totalAmount: 0 };
        }
        acc[status].totalQuantity += quantity;
        acc[status].totalAmount += Number(amount);
        return acc;
      }, {});
      return Object.assign(Object.assign({}, agency), {
        groupedPayouts: Object.values(payoutByStatus),
      });
    });
    const totalCount = yield prisma.users.count({});
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
      result,
      meta: { page: page, size: take, total: totalCount, totalPage },
    };
  });
const relaseAgencyPayout = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.payoutHistory.updateMany({
      where: {
        agency_id: id,
        status: {
          not: 'paid',
        },
      },
      data: {
        status: 'paid',
      },
    });
    if (result) {
      return 'Payout relased successfully';
    }
    return 'Payout failed';
  });
exports.adminService = {
  getAllAgencies,
  getAllTourPlan,
  getAllBookings,
  getPayouts,
  relaseAgencyPayout,
};
