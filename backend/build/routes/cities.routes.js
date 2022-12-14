"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cities_controller_1 = __importDefault(require("../controllers/Cities.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const citiesRouter = (0, express_1.Router)();
citiesRouter.get('/cities', Cities_controller_1.default.getCities, error_middleware_1.default.handleErrors);
citiesRouter.post('/cities', Cities_controller_1.default.createCity, error_middleware_1.default.handleErrors);
citiesRouter.put('/cities/:id', Cities_controller_1.default.updateCity, error_middleware_1.default.handleErrors);
citiesRouter.delete('/cities/:id', Cities_controller_1.default.deleteCity, error_middleware_1.default.handleErrors);
exports.default = citiesRouter;
