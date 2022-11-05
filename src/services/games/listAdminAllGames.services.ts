import AppDataSource from '../../data-source';
import { Game } from '../../entities/games.entity';

const listAdminAllGamesServices = async () => {
  const gamesRepository = AppDataSource.getRepository(Game);

  const allGames = gamesRepository.find();

  return allGames;
};
export { listAdminAllGamesServices };
