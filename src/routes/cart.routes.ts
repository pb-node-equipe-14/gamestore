import { Router } from 'express';
import cartAddGameController from '../controllers/cart/cartAddGame.controller';
import cartDelGameController from '../controllers/cart/cartDelGame.controller';
import cartListGameController from '../controllers/cart/cartListGame.controller';
import { verifyAuthUserMiddleware } from '../middlewares/verifyAuthUser.middleware';

const routes = Router();

export const cartRoutes = () => {

  routes.post('', verifyAuthUserMiddleware, cartAddGameController);
  routes.get('', verifyAuthUserMiddleware, cartListGameController);
  routes.delete('', verifyAuthUserMiddleware, cartDelGameController);

  return routes;
};


