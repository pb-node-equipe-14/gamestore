import { Request, Response } from 'express';
import { AppError } from '../../errors/appError';
import cartDelGameService from '../../services/cart/cartDelGame.service';

const cartDelGameController = async (req: Request, res: Response) => {
  const { userEmail } = req;
  const { product_id } = req.params;

  const cartDel = cartDelGameController(userEmail, product_id);

  return res.sendStatus(204);
};
export default cartDelGameController;
