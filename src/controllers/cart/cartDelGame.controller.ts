import { Request, Response } from 'express';

import cartDelGameService from '../../services/cart/cartDelGame.service';

const cartDelGameController = async (req: Request, res: Response) => {
  const user_id = req.user.id;
  const { game_id } = req.params;

  const cartDel = await cartDelGameService(user_id, game_id);

  return res.sendStatus(204);
};
export default cartDelGameController;
