import { Request, Response } from 'express';
import listPurchasedService from '../../services/purchased/createPurchased.service';

const listPurchasedController = async (req:Request, res:Response)=>{
  const user_id = req.user.id
  const purchasedList = await listPurchasedService(user_id)
  return res.status(201).json(purchasedList)

}
export default listPurchasedController;
