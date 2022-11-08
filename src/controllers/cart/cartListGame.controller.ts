import { Request, Response } from 'express';
import { cartListGameService } from '../../services/cart/cartListGame.service';

const cartListGameController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const cartList = await cartListGameService(id);

  return res.json(cartList);
};
export { cartListGameController };
