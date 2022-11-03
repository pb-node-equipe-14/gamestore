import AppDataSource from '../../data-source';
import { PaymentInfo } from '../../entities/payment.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IPaymentInfoRequest } from '../../interfaces/paymentInfo/paymentInfo.entity';

const createPaymentInfoService = async (
  { code, dueDate, name, number }: IPaymentInfoRequest,
  id: string,
): Promise<PaymentInfo> => {
  const paymentInfoRepository = AppDataSource.getRepository(PaymentInfo);
  const payments              = await paymentInfoRepository.find()

  const paymentInfoAlreadyExists = payments.find(payment => payment.name && payment.code && payment.dueDate && payment.number)

  if (paymentInfoAlreadyExists) {
    throw new AppError("Payment already exists!", 400)
  }

  const userRepository    = AppDataSource.getRepository(User);
  const users = await userRepository.find()

  const paymentInfo = await paymentInfoRepository.save({
    name,
    number,
    dueDate,
    code,
  });

  await userRepository.update(id, { paymentInfo: paymentInfo });

  return paymentInfo;
};

export { createPaymentInfoService };
