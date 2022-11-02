import { Request,Response } from 'express';
import cartListGameService from '../../services/cart/cartListGame.service';

const cartListGameController = async (req:Request, res:Response)=>{

  //entender de onde vem esse userId..
  const id = req.user.id;
  const cartList = await cartListGameService(id);

  return res.json(cartList);
}
export default cartListGameController;

