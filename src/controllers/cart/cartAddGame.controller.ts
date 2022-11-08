import { Request, Response } from 'express';
import { cartAddGameService } from '../../services/cart/cartAddGame.service';

const cartAddGameController = async (req: Request, res: Response) => {
  const user_id = req.user.id;
  const { game_id } = req.body;

  const cartAdd = await cartAddGameService(user_id, game_id);

  return res.status(201).json(cartAdd);
};
export { cartAddGameController };
