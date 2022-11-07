import { Router } from 'express';
import createCategoriesController from '../controllers/categories/createCategories.controller';
import deleteCategoriesController from '../controllers/categories/deleteCetegories.controller';
import { listCategoriesController } from '../controllers/categories/listCategories.controller';
import { verifyAuthUserMiddleware } from '../middlewares/verifyAuthUser.middleware';

const categoryRoutes = Router();

export const categoriesRoutes = () => {
  categoryRoutes.post('', verifyAuthUserMiddleware, createCategoriesController);
  categoryRoutes.get('', verifyAuthUserMiddleware, listCategoriesController);

  categoryRoutes.delete(
    '/:id',
    verifyAuthUserMiddleware,
    deleteCategoriesController,
  );

  return categoryRoutes;
};
