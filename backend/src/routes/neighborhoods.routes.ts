import { Router } from 'express';
import NeighborhoodsController from '../controllers/Neighborhoods.controller';
import NeighborhoodMiddleware from '../middlewares/validateNeighborhoods.middleware';
import errorMiddleware from '../middlewares/error.middleware';

const neighborhoodsRouter = Router();

neighborhoodsRouter.get(
  '/neighborhoods',
  NeighborhoodsController.getNeighborhoods,
  errorMiddleware.handleErrors
);
neighborhoodsRouter.post(
  '/neighborhoods',
  NeighborhoodMiddleware.validateCreateNeighborhood,
  NeighborhoodsController.createNeighborhood,
  errorMiddleware.handleErrors
);
neighborhoodsRouter.put(
  '/neighborhoods/:id',
  NeighborhoodMiddleware.validateUpdateNeighborhood,
  NeighborhoodsController.updateNeighborhood,
  errorMiddleware.handleErrors
);
neighborhoodsRouter.delete(
  '/neighborhoods/:id',
  NeighborhoodMiddleware.validateDeleteNeighborhood,
  NeighborhoodsController.deleteNeighborhood,
  errorMiddleware.handleErrors
);

export default neighborhoodsRouter;