import { Request, Response } from 'express';
import AppDataSource from '../../data-source';
import { Game } from '../../entities/games.entity';
import { IGamesrequest } from '../../interfaces/games';
import { createGamesServices } from '../../services/games/createGames.services';

const createGamesController = async (req: Request, res: Response) => {
  const data: IGamesrequest = req.body;

  const createGame = await createGamesServices(data);

  return res.status(201).json(createGame);
};
export { createGamesController };
