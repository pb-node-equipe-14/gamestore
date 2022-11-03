import AppDataSource from '../../data-source';
import { PaymentInfo } from '../../entities/payment.entity';

const listPaymentInfoService = async () => {
  const paymentInfoRepository = AppDataSource.getRepository(PaymentInfo);

  const paymentInfo = await paymentInfoRepository.find();

  return paymentInfo;
};

export { listPaymentInfoService };
