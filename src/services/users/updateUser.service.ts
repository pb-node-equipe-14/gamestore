import { hash } from 'bcryptjs';

import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IUserUpdate } from '../../interfaces/users';

const updateUserService = async (
  { name, email, password, age }: IUserUpdate,
  id: string,
) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const user = users.find(user => user.id === id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await userRepository.update(user!.id, {
    name: name ? name : user.name,
    email: email ? email : user.email,
    age: age ? age : user.age,
    password: password ? await hash(password, 10) : user.password,
  });

  return user;
};

export { updateUserService };
