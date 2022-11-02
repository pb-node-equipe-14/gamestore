import { Express } from 'express';
import { paymentInfoRoutes } from './paymentInfos.routes';
import { userRoutes } from './users.routes';

export const appRoutes = (app: Express) => {
  app.use('/users', userRoutes());
  app.use('/payment_infos', paymentInfoRoutes())
};
