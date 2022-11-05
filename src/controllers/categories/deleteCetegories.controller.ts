import { Request, Response } from 'express';
import deleteCategoriesService from '../../services/categories/deleteCategories.service';

const deleteCategoriesController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteCategoriesService(id);

  return res.status(204).json({ message: "Category deleted with success!" });
};

export default deleteCategoriesController;
