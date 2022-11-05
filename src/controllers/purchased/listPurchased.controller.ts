import { Request, Response } from 'express';
import listPurchasedService from '../../services/purchased/listPurchased.service';

const listPurchasedController = async (req: Request, res: Response) => {
  const user_id = req.user.id;
  const purchasedList = await listPurchasedService(user_id);

  return res.json(purchasedList);
};
export default listPurchasedController;
