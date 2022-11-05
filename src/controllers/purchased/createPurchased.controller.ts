import { Request, Response } from 'express';
import createPurchasedService from '../../services/purchased/createPurchased.service';

const createPurchasedController = async (req:Request, res:Response)=>{
  const user_id = req.user.id
  const purchased = await createPurchasedService(user_id)
  return res.status(201).json(purchased)

}
export default createPurchasedController;

