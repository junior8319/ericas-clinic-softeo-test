import { Router } from 'express';
import TelController from '../controllers/Telephones.controller';
import PhoneMiddleware from '../middlewares/validateTelephones.middleware';
import errorMiddleware from '../middlewares/error.middleware';

const telephonesRouter = Router();

telephonesRouter.get(
  '/telephones',
  TelController.getTelephones,
  errorMiddleware.handleErrors
);

telephonesRouter.post(
  '/telephones',
  PhoneMiddleware.validateCreatePhone,
  TelController.createTelephone,
  errorMiddleware.handleErrors
);

telephonesRouter.put(
  '/telephones/:id',
  PhoneMiddleware.validateUpdatePhone,
  TelController.updateTelephone,
  errorMiddleware.handleErrors
);

telephonesRouter.delete(
  '/telephones/:id',
  PhoneMiddleware.validateDeletePhone,
  TelController.deleteTelephone,
  errorMiddleware.handleErrors
);

export default telephonesRouter;
