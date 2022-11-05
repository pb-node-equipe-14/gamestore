import AppDataSource from '../../data-source';
import { Game } from '../../entities/games.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';

const deleteGamesServices = async (id: string) => {
  const GamesRepository = AppDataSource.getRepository(Game);

  const games = await GamesRepository.find();

  const game = games.find(user => user.id === id);

  if (!game) {
    throw new AppError('User not found', 404);
  }

  if (!game.isActive) {
    throw new AppError('Game Already excluded', 400);
  }

  await GamesRepository.update(game!.id, { isActive: false });

  return true;
};

export { deleteGamesServices };
