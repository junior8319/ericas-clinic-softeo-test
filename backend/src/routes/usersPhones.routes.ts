import { Router } from 'express';
import UsersPhonesController from '../controllers/UsersPhones.controller';
import errorMiddleware from '../middlewares/error.middleware';

const usersPhonesRouter = Router();

usersPhonesRouter.get(
  '/usersPhones',
  UsersPhonesController.getUsersPhones,
  errorMiddleware.handleErrors
);

usersPhonesRouter.post(
  '/usersPhones',
  UsersPhonesController.createUserPhone,
  errorMiddleware.handleErrors,
);

usersPhonesRouter.put(
  '/usersPhones/:userId/:phoneId/:type',
  UsersPhonesController.updateUserPhone,
  errorMiddleware.handleErrors,
);

usersPhonesRouter.delete(
  '/usersPhones/:userId/:phoneId/:type',
  UsersPhonesController.deleteUserPhone,
  errorMiddleware.handleErrors,
);

export default usersPhonesRouter;
