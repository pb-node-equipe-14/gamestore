import AppDataSource from '../../data-source';
import { Favorite } from '../../entities/favorite.entity';
import { User } from '../../entities/user.entity';

import { AppError } from '../../errors/appError';

const deleteFavoriteService = async (user_id: string, game_id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: user_id,
    },
  });

  const favoriteRepository = AppDataSource.getRepository(Favorite);

  const favorite = await favoriteRepository.findOne({
    where: {
      id: user?.favorite.id,
    },
  });

  console.log(game_id);

  if (favorite) {
    if (favorite.games.filter(game => game.id === game_id).length === 0) {
      throw new AppError('Game is not in favorite', 404);
    }

    favorite.games = favorite.games.filter(game => game.id !== game_id);

    await favoriteRepository.save(favorite);
  }
};
export default deleteFavoriteService;
