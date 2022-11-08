import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';

const cartListGameService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const cartProperties = await userRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      cart: true,
    },
  });

  return cartProperties?.cart;
};
export { cartListGameService };
