import { Request, Response } from 'express';
import { deleteFavoriteService } from '../../services/favorite/deleteFavorite.service';

const deleteFavoriteController = async (req: Request, res: Response) => {
  const user_id = req.user.id;
  const { game_id } = req.params;

  const favoriteDel = await deleteFavoriteService(user_id, game_id);

  return res.sendStatus(204);
};

export { deleteFavoriteController };
