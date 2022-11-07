import { Router } from 'express';
import { createGamesController } from '../controllers/games/createGames.controller';
import deleteGamesController from '../controllers/games/deleteGames.controller';
import { listAdminAllGamesController } from '../controllers/games/listAdminAllGames.controllers';
import { listGamesActiveController } from '../controllers/games/listAllGames.controller';
import { listGamesbyCategoryController } from '../controllers/games/listGamesbyCategory.controller';
import { listOneGamesControllers } from '../controllers/games/listOneGames.controller';
import { UpdateGamesControllers } from '../controllers/games/updateGames.controller';
import {
  gameCreateSchema,
  validateGameCreate,
} from '../middlewares/validateGameCreate.middleware';
import { verifyAuthUserMiddleware } from '../middlewares/verifyAuthUser.middleware';
import { verifyUserAdmMiddleware } from '../middlewares/verifyUserAdm.middleware';

const routes = Router();
// caso o usuário seja admistrador, ele consegue listar todos os jogos
// caso o usuário não seja adminstrador, ele lista apenas os jogos que estão ativos
export const gamesRoutes = () => {
  routes.post(
    '',
    verifyAuthUserMiddleware,
    verifyUserAdmMiddleware,
    validateGameCreate(gameCreateSchema),
    createGamesController,
  );
  routes.get(
    '',
    verifyAuthUserMiddleware,
    verifyUserAdmMiddleware,
    listAdminAllGamesController,
  );
  routes.get(
    '/category/:id',
    verifyAuthUserMiddleware,
    listGamesbyCategoryController,
  );

  routes.patch(
    '/:id',
    verifyAuthUserMiddleware,
    verifyUserAdmMiddleware,
    UpdateGamesControllers,
  );
  routes.delete(
    '/:id',
    verifyAuthUserMiddleware,
    verifyUserAdmMiddleware,
    deleteGamesController,
  );

  // rotas não precisam de administrador
  routes.get('/isActive', listGamesActiveController);
  routes.get('/:id', verifyAuthUserMiddleware, listOneGamesControllers);
  return routes;
};
