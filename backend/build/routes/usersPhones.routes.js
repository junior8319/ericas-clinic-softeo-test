"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersPhones_controller_1 = __importDefault(require("../controllers/UsersPhones.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const usersPhonesRouter = (0, express_1.Router)();
usersPhonesRouter.get('/users-phones', UsersPhones_controller_1.default.getUsersPhones, error_middleware_1.default.handleErrors);
usersPhonesRouter.post('/users-phones', UsersPhones_controller_1.default.createUserPhone, error_middleware_1.default.handleErrors);
usersPhonesRouter.put('/users-phones/:userId/:phoneId/:type', UsersPhones_controller_1.default.updateUserPhone, error_middleware_1.default.handleErrors);
usersPhonesRouter.delete('/users-phones/:userId/:phoneId/:type', UsersPhones_controller_1.default.deleteUserPhone, error_middleware_1.default.handleErrors);
exports.default = usersPhonesRouter;
