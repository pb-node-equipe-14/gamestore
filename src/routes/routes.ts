import { Express } from 'express';
import { paymentInfoRoutes } from './paymentInfos.routes';
import { cartsRoutes } from './cart.routes';
import { gamesRoutes } from './games.routes';
import { purchasedRoutes } from './purchased.routes';
import { sessionRoutes } from './session.routes';
import { usersRoutes } from './users.routes';

import { categoriesRoutes } from './categories.routes';
import { favoritesRoutes } from './favorite.routes';

const appRoutes = (app: Express) => {
  app.use('/users', usersRoutes());
  app.use('/payment_infos', paymentInfoRoutes());
  app.use('/purchased', purchasedRoutes());
  app.use('/cart', cartsRoutes());
  app.use('/login', sessionRoutes());
  app.use('/categories', categoriesRoutes());
  app.use('/games', gamesRoutes());
  app.use('/favorite', favoritesRoutes());
};

export { appRoutes };
