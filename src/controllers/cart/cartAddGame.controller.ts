import { Request,Response } from "express";
import cartAddGameService from "../../services/cart/cartAddGame.service";


const cartAddGameController = async (req: Request, res: Response)=>{

  //esse paramentro vamos user_id..
  const { userEmail } = req;

  //provavelmente esse id está sendo recebido do json enviado..
  const { product_id } = req.body;

  const cartAdd = await cartAddGameService(product_id, userEmail);

  return res.status(201).json(cartAdd)

;}
export default cartAddGameController;
