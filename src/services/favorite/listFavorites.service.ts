import AppDataSource from '../../data-source';
import { Favorite } from '../../entities/favorite.entity';

const listFavoritesService = async () => {
  const favoriteRepository = AppDataSource.getRepository(Favorite);
  const favorites = await favoriteRepository.find();

  return favorites;
};
export default listFavoritesService;
