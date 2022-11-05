import { Request, Response } from 'express';
import { updateGamesService } from '../../services/games/UpdateGames.services';

const UpdateGamesControllers = async (req: Request, res: Response) => {
  const game = req.body;
  const { id } = req.params;
  const updatedGame = await updateGamesService(game, id);

  return res.status(200).json({ message: 'Game updated' });
};
export { UpdateGamesControllers };
