"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Roles_controller_1 = __importDefault(require("../controllers/Roles.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const validateRoles_middleware_1 = __importDefault(require("../middlewares/validateRoles.middleware"));
const rolesRouter = (0, express_1.Router)();
rolesRouter.get('/roles', Roles_controller_1.default.getRoles, error_middleware_1.default.handleErrors);
rolesRouter.post('/roles', validateRoles_middleware_1.default.validateCreateRoles, Roles_controller_1.default.createRole, error_middleware_1.default.handleErrors);
rolesRouter.put('/roles/:id', Roles_controller_1.default.updateRole, error_middleware_1.default.handleErrors);
rolesRouter.delete('/roles/:id', Roles_controller_1.default.deleteRole, error_middleware_1.default.handleErrors);
exports.default = rolesRouter;
