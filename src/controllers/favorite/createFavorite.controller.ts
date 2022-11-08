import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { createFavoriteService } from '../../services/favorite/createFavorite.service';

const createFavoriteController = async (req: Request, res: Response) => {
  const { game_id } = req.body;
  const user_id = req.user.id;

  const favorite = await createFavoriteService({ game_id }, user_id);

  return res.status(200).json(instanceToInstance(favorite));
};
export { createFavoriteController };
