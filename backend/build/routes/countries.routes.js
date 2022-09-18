"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Countries_controller_1 = __importDefault(require("../controllers/Countries.controller"));
const countriesRouter = (0, express_1.Router)();
countriesRouter.get('/countries', Countries_controller_1.default.getCountries);
countriesRouter.post('countries', Countries_controller_1.default.createCountry);
exports.default = countriesRouter;
