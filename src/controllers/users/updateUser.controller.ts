import { Request, Response } from 'express';
import { updateUserService } from '../../services/users/updateUser.service';

const updateUserController = async (req: Request, res: Response) => {
  const user = req.body;
  const { id } = req.params;
  const updatedUser = await updateUserService(user, id);

  return res.status(200).json({ message: 'User updated' });
};

export { updateUserController };
