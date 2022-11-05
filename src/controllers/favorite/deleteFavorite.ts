import { Request, Response } from 'express';
import deleteFavoriteService from '../../services/favorite/deleteFavorite.service';


const deleteFavoriteController = async (req: Request, res: Response)=>{
    const {id} = req.params;
    await deleteFavoriteService(id)
    return res.status(204).json({ message: "Favorite"})

}

export default deleteFavoriteController
