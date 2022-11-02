import { Router } from 'express';
import { createGamesController } from '../controllers/games/createGames.controller';
import { listAllGamesControllers } from '../controllers/games/listAllGames.controller';
import { listOneGamesControllers } from '../controllers/games/listOneGames.controller';
import { UpdateGamesControllers } from '../controllers/games/updateGames.controller';

const routes = Router();

export const gamesRoutes = () => {
  routes.post('', createGamesController);
  routes.get('', listAllGamesControllers);
  routes.get('/:id', listOneGamesControllers);
  routes.patch('/:id', UpdateGamesControllers);
  return routes;
};
