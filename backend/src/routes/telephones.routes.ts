import { Router } from 'express';
import TelController from '../controllers/Telephones.controller';
import errorMiddleware from '../middlewares/error.middleware';

const telephonesRouter = Router();

telephonesRouter.get('/telephones', TelController.getTelephones, errorMiddleware.handleErrors);
telephonesRouter.post('/telephones', TelController.createTelephone, errorMiddleware.handleErrors);
telephonesRouter.put('/telephones/:id', TelController.updateTelephone, errorMiddleware.handleErrors);
telephonesRouter.delete('/telephones/:id', TelController.deleteTelephone, errorMiddleware.handleErrors);

export default telephonesRouter;
