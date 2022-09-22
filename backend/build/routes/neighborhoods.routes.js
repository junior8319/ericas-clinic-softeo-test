"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Neighborhoods_controller_1 = __importDefault(require("../controllers/Neighborhoods.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const neighborhoodsRouter = (0, express_1.Router)();
neighborhoodsRouter.get('/neighborhoods', Neighborhoods_controller_1.default.getNeighborhoods, error_middleware_1.default.handleErrors);
neighborhoodsRouter.post('/neighborhoods', Neighborhoods_controller_1.default.createNeighborhood, error_middleware_1.default.handleErrors);
neighborhoodsRouter.put('/neighborhoods/:id', Neighborhoods_controller_1.default.updateNeighborhood, error_middleware_1.default.handleErrors);
neighborhoodsRouter.delete('/neighborhoods/:id', Neighborhoods_controller_1.default.deleteNeighborhood, error_middleware_1.default.handleErrors);
exports.default = neighborhoodsRouter;
