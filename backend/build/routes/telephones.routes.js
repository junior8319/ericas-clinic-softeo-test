"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Telephones_controller_1 = __importDefault(require("../controllers/Telephones.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const telephonesRouter = (0, express_1.Router)();
telephonesRouter.get('/telephones', Telephones_controller_1.default.getTelephones, error_middleware_1.default.handleErrors);
telephonesRouter.post('/telephones', Telephones_controller_1.default.createTelephone, error_middleware_1.default.handleErrors);
telephonesRouter.put('/telephones/:id', Telephones_controller_1.default.updateTelephone, error_middleware_1.default.handleErrors);
telephonesRouter.delete('/telephones/:id', Telephones_controller_1.default.deleteTelephone, error_middleware_1.default.handleErrors);
exports.default = telephonesRouter;
