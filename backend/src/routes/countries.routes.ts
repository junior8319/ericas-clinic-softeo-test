import { Router } from 'express';
import CountriesController from '../controllers/Countries.controller';
import errorMiddleware from '../middlewares/error.middleware';

const countriesRouter = Router();

countriesRouter.get('/countries', CountriesController.getCountries, errorMiddleware.handleErrors);
countriesRouter.post('/countries', CountriesController.createCountry, errorMiddleware.handleErrors);
countriesRouter.put('/countries/:id', CountriesController.updateCountry, errorMiddleware.handleErrors);
countriesRouter.delete('/countries/:id', CountriesController.deleteCountry, errorMiddleware.handleErrors);

export default countriesRouter;