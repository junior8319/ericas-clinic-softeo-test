import { Router } from 'express';
import UsersAddressesController from '../controllers/UsersAddresses.controller';
import errorMiddleware from '../middlewares/error.middleware';

const usersAddressesRouter = Router();

usersAddressesRouter.get(
  '/users-addresses',
  UsersAddressesController.getUsersAddresses,
  errorMiddleware.handleErrors,
);

export default usersAddressesRouter;
