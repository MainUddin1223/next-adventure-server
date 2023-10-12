/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import config from '../config';
import authRouter from '../modules/auth/auth.route';
import agencyRouter from '../modules/agency/agency.route';
import userRouter from '../modules/user/user.route';
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter.authRouter,
  },
  {
    path: '/agency',
    route: agencyRouter.agencyRouter,
  },
  {
    path: '/user',
    route: userRouter.userRouter,
  },
  // {
  //   path: '/books',
  //   route: bookRouter.bookRouter,
  // },
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
  const apis = route.route.stack.map((path: any) => {
    return { path: path.route.path, methods: path.route.methods };
  });
  apis.map((api: any) => {
    console.log([
      api.methods,
      {
        route: `${config.server_url}${config.api_route}${route.path}${api.path}`,
      },
    ]);
  });
  router.use(route.path, route.route);
});

export default router;
