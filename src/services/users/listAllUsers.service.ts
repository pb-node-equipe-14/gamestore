import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';

const listAllUsersService = () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = userRepository.find();

  return users;
};

export { listAllUsersService };
