import { instanceToPlain } from 'class-transformer';
import listFavoritesService from '../../services/favorite/listFavorites.service';
import { Request, Response } from 'express';

const listFavoriteController = async (req: Request, res: Response) => {
  const listFavorite = await listFavoritesService();

  return res.json(instanceToPlain(listFavorite));
};
export default listFavoriteController;
