"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Countries_controller_1 = __importDefault(require("../controllers/Countries.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const validateCountries_middleware_1 = __importDefault(require("../middlewares/validateCountries.middleware"));
const countriesRouter = (0, express_1.Router)();
countriesRouter.get('/countries', Countries_controller_1.default.getCountries, error_middleware_1.default.handleErrors);
countriesRouter.post('/countries', validateCountries_middleware_1.default.validateCreateCountry, Countries_controller_1.default.createCountry, error_middleware_1.default.handleErrors);
countriesRouter.put('/countries/:id', validateCountries_middleware_1.default.validateUpdateCountry, Countries_controller_1.default.updateCountry, error_middleware_1.default.handleErrors);
countriesRouter.delete('/countries/:id', validateCountries_middleware_1.default.validateDeleteCountry, Countries_controller_1.default.deleteCountry, error_middleware_1.default.handleErrors);
exports.default = countriesRouter;
