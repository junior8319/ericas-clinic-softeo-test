"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersAddresses_controller_1 = __importDefault(require("../controllers/UsersAddresses.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const usersAddressesRouter = (0, express_1.Router)();
usersAddressesRouter.get('/users-addresses', UsersAddresses_controller_1.default.getUsersAddresses, error_middleware_1.default.handleErrors);
usersAddressesRouter.post('/users-addresses', UsersAddresses_controller_1.default.createUserAddress, error_middleware_1.default.handleErrors);
usersAddressesRouter.put('/users-addresses/:userId/:publicPlaceId/:addressNumber', UsersAddresses_controller_1.default.updateUserAddress, error_middleware_1.default.handleErrors);
exports.default = usersAddressesRouter;
