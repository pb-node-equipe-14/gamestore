import { Router } from 'express';
import createCategoriesController from '../controllers/categories/createCategories.controller';
import deleteCategoriesController from '../controllers/categories/deleteCetegories.controller';
import listCategoriesService from '../services/categories/listCategories.service';

const routes = Router();

export const categoriesRoutes = () => {
  routes.post('', createCategoriesController);
  routes.get('', listCategoriesService);
  routes.delete('', deleteCategoriesController);

  return routes;
};
