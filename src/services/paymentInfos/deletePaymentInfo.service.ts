import AppDataSource from '../../data-source';
import { PaymentInfo } from '../../entities/payment.entity';
import { AppError } from '../../errors/appError';

const deletePaymentInfoService = async (id: string) => {
  const paymentInfoRepository = AppDataSource.getRepository(PaymentInfo);

  const payments = await paymentInfoRepository.find();
  const payment = payments.find(payment => payment.id === id);

  if (!payment) {
    throw new AppError('PaymentInfo not found', 404);
  }

  await paymentInfoRepository.delete(payment);
};

export { deletePaymentInfoService };
