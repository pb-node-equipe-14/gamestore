import { Router } from 'express';
import cartAddGameController from '../controllers/cart/cartAddGame.controller';
import cartDelGameController from '../controllers/cart/cartDelGame.controller';
import cartListGameController from '../controllers/cart/cartListGame.controller';

const routes = Router();

export const cartRoutes = () => {

  routes.post('', cartAddGameController);
  routes.get('', cartListGameController);
  routes.delete('', cartDelGameController);

  return routes;
};


