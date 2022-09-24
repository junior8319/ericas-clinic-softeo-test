import { Router } from 'express';
import PublicPlacesController from '../controllers/PublicPlaces.controller';
import errorMiddleware from '../middlewares/error.middleware';

const publicPlacesRouter = Router();

publicPlacesRouter.get(
  '/public-places',
  PublicPlacesController.getPublicPlaces,
  errorMiddleware.handleErrors
);

publicPlacesRouter.post(
  '/public-places',
  PublicPlacesController.createPublicPlace,
  errorMiddleware.handleErrors,
);

publicPlacesRouter.put(
  '/public-places/:id',
  PublicPlacesController.updatePublicPlace,
  errorMiddleware.handleErrors,
);

publicPlacesRouter.delete(
  '/public-places/:id',
  PublicPlacesController.deletePublicPlace,
  errorMiddleware.handleErrors,
);

export default publicPlacesRouter;
