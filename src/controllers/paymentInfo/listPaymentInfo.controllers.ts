import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { listPaymentInfoService } from '../../services/paymentInfos/listPaymentInfo.service';

const listPaymentInfoController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const paymentInfo = await listPaymentInfoService(id);

  return res.status(200).json(instanceToPlain(paymentInfo));
};

export { listPaymentInfoController };
