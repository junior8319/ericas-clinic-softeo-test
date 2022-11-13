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
const express_1 = __importDefault(require("express"));
const Attendances_service_1 = __importDefault(require("../services/Attendances.service"));
const testDates_helper_1 = __importDefault(require("../helpers/testDates.helper"));
class AttendancesMiddleware {
    constructor() {
        this.validateCreateAttendance = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newAttendance = req.body;
                if (!newAttendance || Object.keys(newAttendance).length === 0) {
                    return res.status(400).json({
                        message: 'Nenhum dado recebido para cadastrar',
                    });
                }
                const VALID_DATE = /[0-9][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/g;
                this.date = newAttendance.date;
                if (!this.date) {
                    return res.status(400)
                        .json({
                        message: 'A data da consulta é requerida para o cadastro,' +
                            ' favor informar (campo "date")',
                    });
                }
                if (!VALID_DATE.test(`${this.date}`)) {
                    return res.status(400)
                        .json({
                        message: 'A data da consulta deve estar no formato "aaaa-mm-dd".' +
                            `Não foi possível cadastrar com ${this.date}, favor corrigir.`,
                    });
                }
                if ((0, testDates_helper_1.default)(this.date.toString())) {
                    return res.status(400)
                        .json({
                        message: (0, testDates_helper_1.default)(this.date.toString()),
                    });
                }
                this.appointmentHour = newAttendance.appointmentHour;
                if (!this.appointmentHour) {
                    return res.status(400)
                        .json({
                        message: 'O horário da consulta é requerido para o cadastro,' +
                            ' favor informar (campo: "appointmentHour")',
                    });
                }
                this.customerUserId = Number(newAttendance.customerUserId);
                if (!this.customerUserId || !Number(this.customerUserId)) {
                    return res.status(400)
                        .json({
                        message: 'É necessário informar a pessoa paciente a se consultar.' +
                            ' Favor informar com o campo "customerUserId".',
                    });
                }
                this.professionalUserId = Number(newAttendance.professionalUserId);
                if (!this.professionalUserId || !Number(this.professionalUserId)) {
                    return res.status(400)
                        .json({
                        message: 'É necessário informar a pessoa professional a atender a' +
                            ' paciente. Favor informar com o campo "professionalUserId".',
                    });
                }
                this.totalPrice = Number(newAttendance.totalPrice);
                if (!this.totalPrice || !Number(this.totalPrice)) {
                    return res.status(400)
                        .json({
                        message: 'O preço total da consulta é requerido, favor' +
                            ' informar com o campo "totalPrice"',
                    });
                }
                this.installmentsQuantity = Number(newAttendance.installmentsQuantity);
                if (!this.installmentsQuantity || !Number(this.installmentsQuantity)) {
                    return res.status(400)
                        .json({
                        message: 'Você deve informar a quantidade de parcelas para' +
                            ' pagamento desta consulta com o campo "installmentsQuantity"',
                    });
                }
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.app = (0, express_1.default)();
        this.service = new Attendances_service_1.default();
    }
}
exports.default = new AttendancesMiddleware();
