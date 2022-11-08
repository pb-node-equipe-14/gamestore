import { Router } from 'express';
import { createUserController } from '../controllers/users/createUser.controller';
import { deleteUserController } from '../controllers/users/deleteUser.controller';
import { listAllUsersController } from '../controllers/users/listAllUsers.controller';
import { listUserController } from '../controllers/users/listUser.controller';
import { updateUserController } from '../controllers/users/updateUser.controller';
import {
  userCreateSchema,
  validateUserCreate,
} from '../middlewares/validateUserCreate.middleware';
import { verifyAuthUserMiddleware } from '../middlewares/verifyAuthUser.middleware';
import { verifyFieldUpdatedMiddleware } from '../middlewares/verifyFieldUpdate.middleware';
import { verifyUserAdmMiddleware } from '../middlewares/verifyUserAdm.middleware';
import { verifyOwnerMiddleware } from '../middlewares/verifyUserOwner.middleware';

const userRoutes = Router();

const usersRoutes = () => {
  userRoutes.post(
    '',
    validateUserCreate(userCreateSchema),
    createUserController,
  );

  userRoutes.get(
    '',
    verifyAuthUserMiddleware,
    verifyUserAdmMiddleware,
    listAllUsersController,
  );
  userRoutes.get(
    '/:id',
    verifyAuthUserMiddleware,
    verifyOwnerMiddleware,
    listUserController,
  );

  userRoutes.patch(
    '/:id',
    verifyAuthUserMiddleware,
    verifyOwnerMiddleware,
    verifyFieldUpdatedMiddleware,
    updateUserController,
  );

  userRoutes.delete(
    '/:id',
    verifyAuthUserMiddleware,
    verifyOwnerMiddleware,
    deleteUserController,
  );

  return userRoutes;
};

export { usersRoutes };
