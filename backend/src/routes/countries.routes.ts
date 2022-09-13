import { Router } from 'express';
import CountriesController from '../controllers/Countries.controller';

const countriesRouter = Router();

countriesRouter.get('/countries', CountriesController.getCountries);
countriesRouter.post('/countries', CountriesController.createCountry);

export default countriesRouter;