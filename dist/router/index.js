'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require('express'));
const config_1 = __importDefault(require('../config'));
const auth_route_1 = __importDefault(require('../modules/auth/auth.route'));
const agency_route_1 = __importDefault(
  require('../modules/agency/agency.route')
);
const user_route_1 = __importDefault(require('../modules/user/user.route'));
const admin_route_1 = __importDefault(require('../modules/admin/admin.route'));
const router = express_1.default.Router();
const defaultRoutes = [
  {
    path: '/auth',
    route: auth_route_1.default.authRouter,
  },
  {
    path: '/agency',
    route: agency_route_1.default.agencyRouter,
  },
  {
    path: '/user',
    route: user_route_1.default.userRouter,
  },
  {
    path: '/admin',
    route: admin_route_1.default.adminRouter,
  },
  // {
  //   path: '/profile',
  //   route: profileRouter.profileRouter,
  // },
  // {
  //   path: '/orders',
  //   route: orderRouter.orderRouter,
  // },
];
defaultRoutes.forEach(route => {
  const apis = route.route.stack.map(path => {
    return { path: path.route.path, methods: path.route.methods };
  });
  apis.map(api => {
    console.log([
      api.methods,
      {
        route: `${config_1.default.server_url}${config_1.default.api_route}${route.path}${api.path}`,
      },
    ]);
  });
  router.use(route.path, route.route);
});
exports.default = router;
