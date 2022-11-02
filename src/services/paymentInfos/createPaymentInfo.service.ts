import AppDataSource from '../../data-source';
import { PaymentInfo } from '../../entities/payment.entity';
import { User } from '../../entities/user.entity';
import { IPaymentInfoRequest } from '../../interfaces/paymentInfo/paymentInfo.entity';

const createPaymentInfoService = async (
  { code, dueDate, name, number }: IPaymentInfoRequest,
  id: string,
): Promise<PaymentInfo> => {
  const paymentInfoRepository = AppDataSource.getRepository(PaymentInfo);

  const userRepository = AppDataSource.getRepository(User);

  const paymentInfo = await paymentInfoRepository.save({
    name,
    number,
    dueDate,
    code,
  });

  // await userRepository.update(id, { paymentInfo: paymentInfo });

  return paymentInfo;
};

export { createPaymentInfoService };
