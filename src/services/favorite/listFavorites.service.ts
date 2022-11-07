import AppDataSource from '../../data-source';
import { Favorite } from '../../entities/favorite.entity';
import { User } from '../../entities/user.entity';

const listFavoritesService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const favoriteProperties = await userRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      favorite: true,
    },
  });

  return favoriteProperties?.favorite;
};
export { listFavoritesService };
