import { Router } from 'express';
import createCategoriesController from '../controllers/categories/createCategories.controller';
import deleteCategoriesController from '../controllers/categories/deleteCetegories.controller';
import { listCategoriesController } from '../controllers/categories/listCategories.controller';

const routes = Router();

export const categoriesRoutes = () => {
  routes.post('', createCategoriesController);
  routes.get('', listCategoriesController);
  routes.delete('', deleteCategoriesController);

  return routes;
};
