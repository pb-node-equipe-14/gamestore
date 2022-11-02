import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { listAllUsersService } from '../../services/users/listAllUsers.service';

const listAllUsersController = async (req: Request, res: Response) => {
  const listAllUsers = await listAllUsersService();

  return res.json(instanceToPlain(listAllUsers));
};

export { listAllUsersController };
