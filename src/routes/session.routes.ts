import { Router } from 'express';
import { createSessionController } from '../controllers/sessions/createSession.controller';

const routes = Router();

export const sessionRoutes = () => {
  routes.post('', createSessionController);

  return routes;
};
