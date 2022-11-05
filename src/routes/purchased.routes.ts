import { Router } from 'express';
import createPurchasedController from '../controllers/purchased/createPurchased.controller';
import listPurchasedController from '../controllers/purchased/listPurchased.controller';
import { verifyAuthUserMiddleware } from '../middlewares/verifyAuthUser.middleware';

const routes = Router();

export const purchasedRoutes = () => {
  routes.post('', verifyAuthUserMiddleware, createPurchasedController);
  routes.get('', verifyAuthUserMiddleware, listPurchasedController);

  return routes;
};
