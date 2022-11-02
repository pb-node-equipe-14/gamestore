import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { listAllGamesServices } from '../../services/games/listGames.services';
const listAllGamesControllers = async (req: Request, res: Response) => {
  const listAllGames = await listAllGamesServices();

  return res.json(instanceToPlain(listAllGames));
};
export { listAllGamesControllers };
