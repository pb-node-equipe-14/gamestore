import AppDataSource from '../../data-source';
import { PaymentInfo } from '../../entities/payment.entity';

const listPaymentInfoService = () => {
  const paymentInfoRepository = AppDataSource.getRepository(PaymentInfo);

  const paymentInfo = paymentInfoRepository.find();

  return paymentInfo;
};

export { listPaymentInfoService };
