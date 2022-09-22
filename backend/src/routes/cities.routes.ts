import { Router } from 'express';
import CitiesController from '../controllers/Cities.controller';
import errorMiddleware from '../middlewares/error.middleware';

const citiesRouter = Router();

citiesRouter.get('/cities', CitiesController.getCities, errorMiddleware.handleErrors);
citiesRouter.post('/cities', CitiesController.createCity, errorMiddleware.handleErrors);
citiesRouter.put('/cities/:id', CitiesController.updateCity, errorMiddleware.handleErrors);
citiesRouter.delete('/cities/:id', CitiesController.deleteCity, errorMiddleware.handleErrors);

export default citiesRouter;