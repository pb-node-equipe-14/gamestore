import { Router } from 'express';
import createFavoriteController from '../controllers/favorite/createFavorite.controller';
import deleteFavoriteController from '../controllers/favorite/deleteFavorite';
import listFavoriteController from '../controllers/favorite/listFavorite.controller';
import { verifyAuthUserMiddleware } from '../middlewares/verifyAuthUser.middleware';

const routes = Router();

export const favoriteRoutes = () => {
  routes.post('', verifyAuthUserMiddleware, createFavoriteController);
  routes.get('', verifyAuthUserMiddleware, listFavoriteController);
  routes.delete(
    '/:game_id',
    verifyAuthUserMiddleware,
    deleteFavoriteController,
  );

  return routes;
};
