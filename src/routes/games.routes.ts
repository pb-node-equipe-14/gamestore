import { Router } from 'express';
import { createGamesController } from '../controllers/games/createGames.controller';

const routes = Router();

export const gamesRoutes = () => {
  routes.post('', createGamesController);

  return routes;
};
