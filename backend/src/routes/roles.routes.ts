import { Router } from 'express';
import RolesController from "../controllers/Roles.controller";

const rolesRouter = Router();

rolesRouter.get('/roles', RolesController.getRoles);

export default rolesRouter;
