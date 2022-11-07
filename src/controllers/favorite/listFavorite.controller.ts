import { instanceToPlain } from 'class-transformer';
import { listFavoritesService } from '../../services/favorite/listFavorites.service';
import { Request, Response } from 'express';

const listFavoriteController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const listFavorite = await listFavoritesService(id);

  return res.json(instanceToPlain(listFavorite));
};
export { listFavoriteController };
