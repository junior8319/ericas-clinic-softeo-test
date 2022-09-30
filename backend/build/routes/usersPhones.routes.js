"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersPhones_controller_1 = __importDefault(require("../controllers/UsersPhones.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const usersPhonesRouter = (0, express_1.Router)();
usersPhonesRouter.get('/usersPhones', UsersPhones_controller_1.default.getUsersPhones, error_middleware_1.default.handleErrors);
usersPhonesRouter.post('/usersPhones', UsersPhones_controller_1.default.createUserPhone, error_middleware_1.default.handleErrors);
exports.default = usersPhonesRouter;
