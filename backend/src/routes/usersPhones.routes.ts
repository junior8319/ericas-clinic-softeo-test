import { Router } from 'express';
import UsersPhonesController from '../controllers/UsersPhones.controller';
import errorMiddleware from '../middlewares/error.middleware';

const usersPhonesRouter = Router();

usersPhonesRouter.get(
  '/users-phones',
  UsersPhonesController.getUsersPhones,
  errorMiddleware.handleErrors
);

usersPhonesRouter.post(
  '/users-phones',
  UsersPhonesController.createUserPhone,
  errorMiddleware.handleErrors,
);

usersPhonesRouter.put(
  '/users-phones/:userId/:phoneId/:type',
  UsersPhonesController.updateUserPhone,
  errorMiddleware.handleErrors,
);

usersPhonesRouter.delete(
  '/users-phones/:userId/:phoneId/:type',
  UsersPhonesController.deleteUserPhone,
  errorMiddleware.handleErrors,
);

export default usersPhonesRouter;
