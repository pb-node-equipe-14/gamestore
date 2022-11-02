import { Request, Response } from 'express';
import { deletePaymentInfoService } from '../../services/paymentInfos/deletePaymentInfo.service';

const deletePaymentInfoController = async (req: Request, res: Response) => {
  const { id }  = req.params;
  const deletePaymentInfo = await deletePaymentInfoService(id);
  return res.status(204).json(deletePaymentInfo);
};

export { deletePaymentInfoController };
