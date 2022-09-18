import { Router } from 'express';
import RolesController from "../controllers/Roles.controller";

const rolesRouter = Router();

rolesRouter.get('/roles', RolesController.getRoles);
rolesRouter.post('/roles', RolesController.createRole);

export default rolesRouter;
