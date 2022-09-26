"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Attendances_service_1 = __importDefault(require("../services/Attendances.service"));
class Attendances {
    constructor() {
        this.getAttendances = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const attendancesList = yield this.service.getAttendances();
                if (!attendancesList)
                    return res.status(404)
                        .json({ message: 'Não encontramos atendimentos.' });
                return res.status(200).json(attendancesList);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.createAttendance = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newAttendance = req.body;
                const createdAttendance = yield this.service.createAttendance(newAttendance);
                if (!createdAttendance) {
                    return res.status(400)
                        .json({
                        message: `Não foi possível criar atendimento com os dados ${newAttendance}`,
                    });
                }
                return res.status(201).json(createdAttendance);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateAttendance = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !req.body)
                    return res.status(400)
                        .json({ message: 'Sem dado para atualizar' });
                const attendance = Object.assign(Object.assign({}, req.body), { id });
                yield this.service.updateAttendance(attendance);
                return res.status(200).json(attendance);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.deleteAttendance = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400)
                        .json({
                        message: 'Por favor, nos passe um identificador(id) para excluir.',
                    });
                const attendanceDeleted = yield this.service.deleteAttendance(id);
                if (!attendanceDeleted)
                    return res.status(404)
                        .json({ message: `Não encontramos atendimento com o id ${id}` });
                return res.status(202).json({ message: 'Registro excluído com sucesso' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new Attendances_service_1.default();
    }
}
exports.default = new Attendances();
