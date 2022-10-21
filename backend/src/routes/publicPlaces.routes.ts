import { Router } from 'express';
import PublicPlacesController from '../controllers/PublicPlaces.controller';
import PublicPlacesMiddleware from '../middlewares/validatePubPlaces.middleware';
import errorMiddleware from '../middlewares/error.middleware';

const publicPlacesRouter = Router();

publicPlacesRouter.get(
  '/public-places',
  PublicPlacesController.getPublicPlaces,
  errorMiddleware.handleErrors
);

publicPlacesRouter.post(
  '/public-places',
  PublicPlacesMiddleware.validateCreatePublicPlace,
  PublicPlacesController.createPublicPlace,
  errorMiddleware.handleErrors,
);

publicPlacesRouter.put(
  '/public-places/:id',
  PublicPlacesMiddleware.validateUpdatePublicPlace,
  PublicPlacesController.updatePublicPlace,
  errorMiddleware.handleErrors,
);

publicPlacesRouter.delete(
  '/public-places/:id',
  PublicPlacesController.deletePublicPlace,
  errorMiddleware.handleErrors,
);

export default publicPlacesRouter;
