import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';

const listPurchasedService = async (user_id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const purchasedProperties = await userRepository.findOne({
    where: {
      id: user_id,
    },
    relations: {
      purchased: true,
    },
  });

  return purchasedProperties?.purchased;
};
export { listPurchasedService };
