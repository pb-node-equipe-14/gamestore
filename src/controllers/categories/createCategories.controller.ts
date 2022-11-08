import { Request, Response } from 'express';
import { createCategoriesService } from '../../services/categories/createCategories.service';

const createCategoriesController = async (req: Request, res: Response) => {
  const categories = req.body;

  const newCategorie = await createCategoriesService(categories);

  return res.status(201).json(newCategorie);
};

export { createCategoriesController };
