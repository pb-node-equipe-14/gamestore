import { Router } from 'express';
import { createGamesController } from '../controllers/games/createGames.controller';
import { deleteGamesController } from '../controllers/games/deleteGames.controller';
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

const gameRoutes = Router();

const gamesRoutes = () => {
  gameRoutes.post(
    '',
    verifyAuthUserMiddleware,
    verifyUserAdmMiddleware,
    validateGameCreate(gameCreateSchema),
    createGamesController,
  );
  gameRoutes.get(
    '',
    verifyAuthUserMiddleware,
    verifyUserAdmMiddleware,
    listAdminAllGamesController,
  );
  gameRoutes.get(
    '/category/:id',
    verifyAuthUserMiddleware,
    listGamesbyCategoryController,
  );

  gameRoutes.patch(
    '/:id',
    verifyAuthUserMiddleware,
    verifyUserAdmMiddleware,
    UpdateGamesControllers,
  );
  gameRoutes.delete(
    '/:id',
    verifyAuthUserMiddleware,
    verifyUserAdmMiddleware,
    deleteGamesController,
  );

  // rotas não precisam de administrador
  gameRoutes.get('/isActive', listGamesActiveController);
  gameRoutes.get('/:id', verifyAuthUserMiddleware, listOneGamesControllers);

  return gameRoutes;
};

export { gamesRoutes };
