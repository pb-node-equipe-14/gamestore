import { Request, Response } from 'express';
import { listPaymentInfoService } from '../../services/paymentInfos/listPaymentInfo.service';

const listPaymentInfoController = async (req: Request, res: Response) => {
  const paymentInfo = await listPaymentInfoService();

  return res.status(200).json(paymentInfo);
};

export { listPaymentInfoController };
