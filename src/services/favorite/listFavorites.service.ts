import AppDataSource from '../../data-source';
import { Favorite } from '../../entities/favorite.entity';

const listFavoritesService = (): Promise<Favorite[]> => {
  const favoriteRepository = AppDataSource.getRepository(Favorite);
  const favorites = favoriteRepository.find();

  return favorites;
};
export default listFavoritesService;
