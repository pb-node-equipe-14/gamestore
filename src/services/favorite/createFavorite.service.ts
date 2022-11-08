import AppDataSource from '../../data-source';
import { IFavoriteRequest } from '../../interfaces/favorite';
import { Favorite } from '../../entities/favorite.entity';
import { AppError } from '../../errors/appError';
import { Game } from '../../entities/games.entity';
import { User } from '../../entities/user.entity';

const createFavoriteService = async (
  { game_id }: IFavoriteRequest,
  user_id: string,
) => {
  const userRepository = AppDataSource.getRepository(User);
  const favoriteRepository = AppDataSource.getRepository(Favorite);
  const gameRepository = AppDataSource.getRepository(Game);

  const user = await userRepository.findOne({
    where: {
      id: user_id,
    },
  });

  const favorites = await favoriteRepository.findOne({
    where: {
      id: user?.favorite.id,
    },
  });

  const games = await gameRepository.find();

  const gameToAdd = games.find(game => game.id === game_id);

  if (!gameToAdd) {
    throw new AppError('Game not found', 404);
  }

  if (favorites && gameToAdd) {
    if (
      favorites.games.filter(game => game.name === gameToAdd.name).length > 0
    ) {
      throw new AppError('Game is already in favorite', 409);
    }

    favorites.games = [...favorites.games, gameToAdd];

    await favoriteRepository.save(favorites);

    return favorites;
  }
};

export { createFavoriteService };
