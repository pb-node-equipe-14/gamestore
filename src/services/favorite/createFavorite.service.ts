import AppDataSource from "../../data-source";
import { IFavoriteRequest } from "../../interfaces/favorite";
import {Favorite} from "../../entities/favorite.entity"
import { AppError } from "../../errors/appError";
import { Game } from "../../entities/games.entity";

const createFavoriteService = async({id_games}:IFavoriteRequest):Promise<Favorite>=>{
    const favoriteRepository = AppDataSource.getRepository(Favorite)
    const favorite = await favoriteRepository.find()

    const verifyFavoritelreadyExist= favorite.find(favorite=> favorite.id === id_games)
    if(verifyFavoritelreadyExist){
        throw new AppError('This favorite already exists')
    }

    const newFavorite = await favoriteRepository.save({
     data_insert:Date()
    })

    return newFavorite

}

export default createFavoriteService