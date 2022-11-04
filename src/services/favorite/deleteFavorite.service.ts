import AppDataSource from '../../data-source';
import { Favorite } from '../../entities/favorite.entity';

import { AppError } from '../../errors/appError';

const deleteFavoriteService = async (id: string) => {
  const favoriteRepository = AppDataSource.getRepository(Favorite)
  const favorites = await favoriteRepository.find()
  const favorite = favorites.find(item => item.id === id)

  if (!favorite) {
    return "erro"
  }

  await favoriteRepository.delete(favorite)
};
export default deleteFavoriteService;

