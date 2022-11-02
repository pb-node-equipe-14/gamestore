import { Router } from 'express';
import { createUserController } from '../controllers/users/createUser.controller';
import deleteUserController from '../controllers/users/deleteUser.controller';
import { listAllUsersController } from '../controllers/users/listAllUsers.controller';
import { listUserController } from '../controllers/users/listUser.controller';
import updateUserController from '../controllers/users/updateUser.controller';
import {
  userCreateSchema,
  validateUserCreate,
} from '../middlewares/validateUserCreate.middleware';
import verifyFieldUpdatedMiddleware from '../middlewares/verifyFieldUpdate.middleware';

const routes = Router();

export const userRoutes = () => {
  routes.post('', validateUserCreate(userCreateSchema), createUserController);

  routes.get('', listAllUsersController);
  routes.get('/:id', listUserController);

  routes.patch('/:id', verifyFieldUpdatedMiddleware, updateUserController);

  routes.delete('/:id', deleteUserController);

  return routes;
};
