import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { createUserService } from '../../services/users/createUser.service';

const createUserController = async (req: Request, res: Response) => {
  const { name, email, age, password, isAdm } = req.body;

  const user = await createUserService({ name, email, age, password, isAdm });

  return res.status(201).json(instanceToInstance(user));
};

export { createUserController };
