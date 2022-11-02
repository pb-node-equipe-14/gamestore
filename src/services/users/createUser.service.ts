import { hash } from 'bcryptjs';
import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IUserRequest } from '../../interfaces/users';

const createUserService = async ({
  name,
  email,
  age,
  password,
  isAdm,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find(user => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError('Email already exists');
  }

  const hashedPass = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    age,
    password: hashedPass,
    isAdm,
  });

  await userRepository.save(user);

  return user;
};
export { createUserService };
