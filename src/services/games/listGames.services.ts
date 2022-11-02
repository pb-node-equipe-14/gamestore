import AppDataSource from '../../data-source';
import { Game } from '../../entities/games.entity';

const listAllGamesServices = async () => {
  const gamesRepository = AppDataSource.getRepository(Game);

  const allGames = gamesRepository.find();

  return allGames;
};
export { listAllGamesServices };
