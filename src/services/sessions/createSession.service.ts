import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IUserLogin } from '../../interfaces/users';

const createSessionService = async ({ password, email }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.findOneBy({ email: email });

  if (!users) {
    throw new AppError('Wrong email/password', 403);
  }

  if (!compareSync(password, users.password)) {
    throw new AppError('Wrong email/password', 403);
  }

  if (!users.isActive) {
    throw new AppError("User isn't active");
  }

  const token = jwt.sign(
    { isAdm: users.isAdm },
    String(process.env.SECRET_KEY),
    { expiresIn: '24h', subject: users.id },
  );

  return token;
};

export { createSessionService };
