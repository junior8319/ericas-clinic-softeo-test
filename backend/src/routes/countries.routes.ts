import { Router } from 'express';
import CountriesController from '../controllers/Countries.controller';
import errorMiddleware from '../middlewares/error.middleware';
import CountriesMiddleware from '../middlewares/validateCountries.middleware';

const countriesRouter = Router();

countriesRouter.get(
  '/countries',
  CountriesController.getCountries,
  errorMiddleware.handleErrors
);

countriesRouter.post(
  '/countries',
  CountriesMiddleware.validateCreateCountry,
  CountriesController.createCountry,
  errorMiddleware.handleErrors
);

countriesRouter.put(
  '/countries/:id',
  CountriesMiddleware.validateUpdateCountry,
  CountriesController.updateCountry,
  errorMiddleware.handleErrors
);

countriesRouter.delete(
  '/countries/:id',
  CountriesMiddleware.validateDeleteCountry,
  CountriesController.deleteCountry,
  errorMiddleware.handleErrors
);

export default countriesRouter;