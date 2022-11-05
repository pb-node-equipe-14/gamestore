import AppDataSource from '../../data-source';
import { Game } from '../../entities/games.entity';
import { AppError } from '../../errors/appError';

const listOneGamesServices = async (id: string) => {
  const gamesRepository = AppDataSource.getRepository(Game);

  const games = await gamesRepository.find();

  const listOneGame = games.find(game => game.id === id);

  if (!listOneGame) {
    throw new AppError('Game not found', 404);
  }

  return listOneGame;
};
export { listOneGamesServices };
