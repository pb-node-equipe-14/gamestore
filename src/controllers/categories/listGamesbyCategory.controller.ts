import { Request, Response } from 'express';
import { listGamesbyCategoryService } from '../../services/categories/listGamesbyCategory.service';

const listGamesbyCategoryController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const listCategory = await listGamesbyCategoryService(id);

  return res.status(200).json(listCategory);
};

export { listGamesbyCategoryController };
