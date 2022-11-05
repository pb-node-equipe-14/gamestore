import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';

const listUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.find();

  const listUser = user.find(user => user.id === id);

  if (!listUser) {
    throw new AppError('User not found', 404);
  }

  return listUser;
};

export { listUserService };
