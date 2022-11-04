import AppDataSource from "../../data-source"
import { Favorite } from "../../entities/favorite.entity"

const listFavoritesService = ():Promise<Favorite[]>=>{
    const favoriteRespository = AppDataSource.getRepository(Favorite)
    const favorites = favoriteRespository.find();

    return favorites;
}
export default listFavoritesService;