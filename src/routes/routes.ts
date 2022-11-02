import { Express } from 'express';
import { paymentInfoRoutes } from './paymentInfos.routes';
import { cartRoutes } from './cart.routes';
import { gamesRoutes } from './games.routes';
import { purchasedRoutes } from './purchased.routes';
import { sessionRoutes } from './session.routes';
import { userRoutes } from './users.routes';

export const appRoutes = (app: Express) => {
  app.use('/users', userRoutes());
  app.use('/payment_infos', paymentInfoRoutes())
  app.use('/purchased', purchasedRoutes());
  app.use('/cart', cartRoutes());
  app.use('/login', sessionRoutes());
  app.use('/games', gamesRoutes());
};
