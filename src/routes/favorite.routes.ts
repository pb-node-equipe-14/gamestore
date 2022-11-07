import { Router } from 'express';
import { createFavoriteController } from '../controllers/favorite/createFavorite.controller';
import { deleteFavoriteController } from '../controllers/favorite/deleteFavorite';
import { listFavoriteController } from '../controllers/favorite/listFavorite.controller';
import { verifyAuthUserMiddleware } from '../middlewares/verifyAuthUser.middleware';

const favoriteRoutes = Router();

const favoritesRoutes = () => {
  favoriteRoutes.post('', verifyAuthUserMiddleware, createFavoriteController);
  favoriteRoutes.get('', verifyAuthUserMiddleware, listFavoriteController);
  favoriteRoutes.delete(
    '/:game_id',
    verifyAuthUserMiddleware,
    deleteFavoriteController,
  );

  return favoriteRoutes;
};

export { favoritesRoutes };
