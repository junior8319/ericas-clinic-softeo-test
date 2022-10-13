import { Router } from 'express';
import CitiesController from '../controllers/Cities.controller';
import CitiesMiddleware from '../middlewares/validateCities.middleware';
import errorMiddleware from '../middlewares/error.middleware';

const citiesRouter = Router();

citiesRouter.get(
  '/cities',
  CitiesController.getCities,
  errorMiddleware.handleErrors
);

citiesRouter.post(
  '/cities',
  CitiesMiddleware.validateCreateCity,
  CitiesController.createCity,
  errorMiddleware.handleErrors
);

citiesRouter.put(
  '/cities/:id',
  CitiesMiddleware.validateUpdateCity,
  CitiesController.updateCity,
  errorMiddleware.handleErrors
);

citiesRouter.delete(
  '/cities/:id',
  CitiesMiddleware.validateDeleteCity,
  CitiesController.deleteCity,
  errorMiddleware.handleErrors
);


export default citiesRouter;
