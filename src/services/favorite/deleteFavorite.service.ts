import AppDataSource from "../../data-source"
import { Favorite } from "../../entities/favorite.entity"
import { AppError } from "../../errors/appError"



const deleteFavoriteService = async (id:string)=>{
    
    const favoriteRespository = AppDataSource.getRepository(Favorite)

    const favorites = await favoriteRespository.find()

    const favorite = favorites.find(game=> game.id === id)

    if(!favorite){
        throw new AppError('Game not found', 404);
    }

    await favoriteRespository.delete(favorite)
}
export default deleteFavoriteService;