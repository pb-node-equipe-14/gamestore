import { Request, Response } from 'express';
import cartAddGameService from '../../services/cart/cartAddGame.service';

const cartAddGameController = async (req: Request, res: Response) => {
  const user_id = req.user.id;
  const { game_id } = req.body;

  const cartAdd = await cartAddGameService(game_id, user_id);

  return res.status(201).json(cartAdd);
};
export default cartAddGameController;
