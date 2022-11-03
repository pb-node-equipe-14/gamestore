import { Router } from 'express'

import { createPaymentInfoController } from '../controllers/paymentInfo/createPaymentInfos.controllers'
import { deletePaymentInfoController } from '../controllers/paymentInfo/deletePaymentInfos.controllers';
import { listAllPaymentInfoController } from '../controllers/paymentInfo/listAllPaymentInfo.controllers';
import { listPaymentInfoController } from '../controllers/paymentInfo/listPaymentInfo.controllers';
import { verifyAuthUserMiddleware } from '../middlewares/verifyAuthUser.middleware';

const paymentInfosRoutes = Router()

export const paymentInfoRoutes = () => {
  paymentInfosRoutes.post('', verifyAuthUserMiddleware, createPaymentInfoController)
  paymentInfosRoutes.get('', verifyAuthUserMiddleware, listAllPaymentInfoController)
  paymentInfosRoutes.get('/:id', verifyAuthUserMiddleware, listPaymentInfoController)
  paymentInfosRoutes.delete('/:id', verifyAuthUserMiddleware, deletePaymentInfoController)

  return paymentInfosRoutes;
};

