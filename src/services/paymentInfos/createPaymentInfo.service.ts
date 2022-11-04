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
  const userRepository = AppDataSource.getRepository(User);

  const payments = await paymentInfoRepository.find();
  const users = await userRepository.find();

  const user = users.find(user => user.id === id);

  const paymentInfoAlreadyExists = payments.find(payment => payment.name === name && payment.code === code && payment.number === number)

  if (code.length != 3){
    throw new AppError("error")
  }

  if (paymentInfoAlreadyExists) {
    throw new AppError("Payment already exists!", 400)
  }

  const paymentInfo = await paymentInfoRepository.save({
    user,
    name,
    number,
    dueDate,
    code,
  });

  return paymentInfo;
};

export { createPaymentInfoService };
