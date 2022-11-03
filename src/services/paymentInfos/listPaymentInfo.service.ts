import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';

const listPaymentInfoService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id,
    },
    relations: {
      paymentInfo: true,
    },
  });
  return user?.paymentInfo;
};

export { listPaymentInfoService };
