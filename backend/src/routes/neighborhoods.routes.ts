import { Router } from 'express';
import NeighborhoodsController from '../controllers/Neighborhoods.controller';
import errorMiddleware from '../middlewares/error.middleware';

const neighborhoodsRouter = Router();

neighborhoodsRouter.get(
  '/neighborhoods',
  NeighborhoodsController.getNeighborhoods,
  errorMiddleware.handleErrors
);
neighborhoodsRouter.post(
  '/neighborhoods',
  NeighborhoodsController.createNeighborhood,
  errorMiddleware.handleErrors
);
neighborhoodsRouter.put(
  '/neighborhoods/:id',
  NeighborhoodsController.updateNeighborhood,
  errorMiddleware.handleErrors
);
neighborhoodsRouter.delete(
  '/neighborhoods/:id',
  NeighborhoodsController.deleteNeighborhood,
  errorMiddleware.handleErrors
);

export default neighborhoodsRouter;