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

export default usersPhonesRouter;
