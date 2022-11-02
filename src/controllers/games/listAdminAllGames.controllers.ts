import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { listAdminAllGamesServices } from '../../services/games/listAdminAllGames.services';

const listAdminAllGamesController = async (req: Request, res: Response) => {
  const listAllGames = await listAdminAllGamesServices();

  return res.json(instanceToPlain(listAllGames));
};
export { listAdminAllGamesController };
