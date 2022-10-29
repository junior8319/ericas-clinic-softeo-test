"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_controller_1 = __importDefault(require("../controllers/Users.controller"));
const validateUsers_middleware_1 = __importDefault(require("../middlewares/validateUsers.middleware"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const usersRouter = (0, express_1.Router)();
usersRouter.get('/users', Users_controller_1.default.getUsers, error_middleware_1.default.handleErrors);
usersRouter.post('/users', validateUsers_middleware_1.default.validateCreateUser, Users_controller_1.default.createUser, error_middleware_1.default.handleErrors);
usersRouter.put('/users/:id', validateUsers_middleware_1.default.validateUpdateUser, Users_controller_1.default.updateUser, error_middleware_1.default.handleErrors);
usersRouter.delete('/users/:id', validateUsers_middleware_1.default.validateDeleteUser, Users_controller_1.default.deleteUser, error_middleware_1.default.handleErrors);
exports.default = usersRouter;
