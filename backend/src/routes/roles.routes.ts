import { Router } from 'express';
import RolesController from "../controllers/Roles.controller";
import errorMiddleware from '../middlewares/error.middleware';

const rolesRouter = Router();

rolesRouter.get('/roles', RolesController.getRoles, errorMiddleware.handleErrors);
rolesRouter.post('/roles', RolesController.createRole, errorMiddleware.handleErrors);
rolesRouter.put('/roles/:id', RolesController.updateRole, errorMiddleware.handleErrors);
rolesRouter.delete('/roles/:id', RolesController.deleteRole, errorMiddleware.handleErrors);

export default rolesRouter;
