import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { listGamesActiveServices } from '../../services/games/listGames.services';

const listGamesActiveController = async (req: Request, res: Response) => {
  const listAllGames = await listGamesActiveServices();

  return res.json(instanceToPlain(listAllGames));
};
export { listGamesActiveController };
