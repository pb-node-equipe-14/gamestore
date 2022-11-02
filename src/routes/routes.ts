import { Express } from 'express';
import { cartRoutes } from './cart.routes';
import { purchasedRoutes } from './purchased.routes';
import { sessionRoutes } from './session.routes';
import { userRoutes } from './users.routes';

export const appRoutes = (app: Express) => {
  app.use('/users', userRoutes());
  app.use('/purchased', purchasedRoutes());
  app.use('/cart', cartRoutes());
  app.use('/login', sessionRoutes());
};
