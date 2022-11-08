import { Router } from 'express';
import { createPurchasedController } from '../controllers/purchased/createPurchased.controller';
import { listPurchasedController } from '../controllers/purchased/listPurchased.controller';
import { verifyAuthUserMiddleware } from '../middlewares/verifyAuthUser.middleware';

const purschaseRoutes = Router();

const purchasedRoutes = () => {
  purschaseRoutes.post('', verifyAuthUserMiddleware, createPurchasedController);
  purschaseRoutes.get('', verifyAuthUserMiddleware, listPurchasedController);

  return purschaseRoutes;
};

export { purchasedRoutes };
