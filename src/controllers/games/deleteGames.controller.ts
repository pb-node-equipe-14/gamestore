import { Request, Response } from 'express';
import { deleteGamesServices } from '../../services/games/deleteGames.services';

const deleteGamesController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userDelete = await deleteGamesServices(id);

  return res.status(204).json(userDelete);
};

export default deleteGamesController;
