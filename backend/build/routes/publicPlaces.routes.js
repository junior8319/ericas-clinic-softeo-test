"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PublicPlaces_controller_1 = __importDefault(require("../controllers/PublicPlaces.controller"));
const validatePubPlaces_middleware_1 = __importDefault(require("../middlewares/validatePubPlaces.middleware"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const publicPlacesRouter = (0, express_1.Router)();
publicPlacesRouter.get('/public-places', PublicPlaces_controller_1.default.getPublicPlaces, error_middleware_1.default.handleErrors);
publicPlacesRouter.post('/public-places', validatePubPlaces_middleware_1.default.validateCreatePublicPlace, PublicPlaces_controller_1.default.createPublicPlace, error_middleware_1.default.handleErrors);
publicPlacesRouter.put('/public-places/:id', validatePubPlaces_middleware_1.default.validateUpdatePublicPlace, PublicPlaces_controller_1.default.updatePublicPlace, error_middleware_1.default.handleErrors);
publicPlacesRouter.delete('/public-places/:id', PublicPlaces_controller_1.default.deletePublicPlace, error_middleware_1.default.handleErrors);
exports.default = publicPlacesRouter;
