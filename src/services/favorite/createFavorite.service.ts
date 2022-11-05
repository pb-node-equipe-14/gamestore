import AppDataSource from "../../data-source";
import { IFavoriteRequest } from "../../interfaces/favorite";
import {Favorite} from "../../entities/favorite.entity"
import { AppError } from "../../errors/appError";
import { Game } from "../../entities/games.entity";

const createFavoriteService = async({id_games}:IFavoriteRequest):Promise<Favorite>=>{

    const favoriteRepository = AppDataSource.getRepository(Favorite)
    const gameRepository     = AppDataSource.getRepository(Game)

    const gamesFavorite = await gameRepository.find({
      where: {
        id:id_games
      }
    });

    const favorite = await favoriteRepository.save({
      data_insert: new Date().toLocaleString(),
      games: gamesFavorite
    })

    return favorite;
}

export default createFavoriteService
