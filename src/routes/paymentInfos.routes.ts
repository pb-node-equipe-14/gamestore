import { Router } from 'express'
import { listPaymentInfoController } from '../controllers/paymentInfo/listPaymentInfo.controllers';
import { createPaymentInfoController } from '../controllers/paymentInfo/createPaymentInfos.controllers'
import { deletePaymentInfoController } from '../controllers/paymentInfo/deletePaymentInfos.controllers';

const paymentInfosRoutes = Router()

export const paymentInfoRoutes = () => {
  paymentInfosRoutes.post('', createPaymentInfoController)
  paymentInfosRoutes.get('', listPaymentInfoController)
  paymentInfosRoutes.delete('/:id', deletePaymentInfoController)

  return paymentInfosRoutes;
};

