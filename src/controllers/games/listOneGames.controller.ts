import { Request, Response } from 'express';
import { listOneGamesServices } from '../../services/games/listOneGames.services';

const listOneGamesControllers = async (req: Request, res: Response) => {
  const { id } = req.params;

  const listUser = await listOneGamesServices(id);

  return res.status(200).json(listUser);
};
export { listOneGamesControllers };
