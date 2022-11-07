import AppDataSource from '../../data-source';
import { Game } from '../../entities/games.entity';

const listGamesActiveServices = async () => {
  const gamesRepository = AppDataSource.getRepository(Game);

  const allGames = await gamesRepository.find({
    where: {
      isActive: true,
    },
  });

  return allGames;
};
export { listGamesActiveServices };
