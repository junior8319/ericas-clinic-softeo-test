"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Attendances_controller_1 = __importDefault(require("../controllers/Attendances.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const attendancesRouter = (0, express_1.Router)();
attendancesRouter.get('/attendances', Attendances_controller_1.default.getAttendances, error_middleware_1.default.handleErrors);
attendancesRouter.post('/attendances', Attendances_controller_1.default.createAttendance, error_middleware_1.default.handleErrors);
attendancesRouter.put('/attendances/:id', Attendances_controller_1.default.updateAttendance, error_middleware_1.default.handleErrors);
attendancesRouter.delete('/attendances/:id', Attendances_controller_1.default.deleteAttendance, error_middleware_1.default.handleErrors);
exports.default = attendancesRouter;
