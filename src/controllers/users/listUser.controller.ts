import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { listUserService } from '../../services/users/listUser.service';

const listUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const listUser = await listUserService(id);

  return res.status(200).json(listUser);
};

export { listUserController };
