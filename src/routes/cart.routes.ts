import { Router } from 'express';
import { cartAddGameController } from '../controllers/cart/cartAddGame.controller';
import { cartDelGameController } from '../controllers/cart/cartDelGame.controller';
import { cartListGameController } from '../controllers/cart/cartListGame.controller';
import { verifyAuthUserMiddleware } from '../middlewares/verifyAuthUser.middleware';

const cartRoutes = Router();

const cartsRoutes = () => {
  cartRoutes.post('', verifyAuthUserMiddleware, cartAddGameController);
  cartRoutes.get('', verifyAuthUserMiddleware, cartListGameController);
  cartRoutes.delete(
    '/:game_id',
    verifyAuthUserMiddleware,
    cartDelGameController,
  );

  return cartRoutes;
};

export { cartsRoutes };
