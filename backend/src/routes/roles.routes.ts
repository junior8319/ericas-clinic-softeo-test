import { Router } from 'express';
import RolesController from "../controllers/Roles.controller";
import errorMiddleware from '../middlewares/error.middleware';
import RolesMiddleware from '../middlewares/validateRoles.middleware';

const rolesRouter = Router();

rolesRouter.get('/roles', RolesController.getRoles, errorMiddleware.handleErrors);
rolesRouter.post(
  '/roles',
  RolesMiddleware.validateCreateRoles,
  RolesController.createRole,
  errorMiddleware.handleErrors,
);
rolesRouter.put(
  '/roles/:id',
  RolesMiddleware.validateUpdateRole,
  RolesController.updateRole,
  errorMiddleware.handleErrors
);
rolesRouter.delete(
  '/roles/:id',
  RolesMiddleware.validateDeleteRole,
  RolesController.deleteRole,
  errorMiddleware.handleErrors
);

export default rolesRouter;
