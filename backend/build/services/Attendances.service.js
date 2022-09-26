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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Attendance_model_1 = __importDefault(require("../database/models/Attendance.model"));
const User_model_1 = __importDefault(require("../database/models/User.model"));
class Attendances {
    constructor() {
        this.getAttendances = () => __awaiter(this, void 0, void 0, function* () {
            const attendancesList = yield Attendance_model_1.default.findAll({
                raw: true,
                include: [
                    { model: User_model_1.default, as: 'attendances', attributes: { exclude: ['birthDate', 'rg', 'cpf', 'createdAt', 'updatedAt'] } },
                    { model: User_model_1.default, as: 'appointments', attributes: { exclude: ['rg', 'cpf', 'createdAt', 'updatedAt'] } },
                ],
            });
            if (!attendancesList)
                return null;
            return attendancesList;
        });
        this.createAttendance = (attendance) => __awaiter(this, void 0, void 0, function* () {
            if (!attendance)
                return null;
            const attendanceExists = yield Attendances.attendanceExists(attendance);
            if (attendanceExists)
                return null;
            const newAttendance = yield Attendance_model_1.default.create(Object.assign({}, attendance));
            if (!newAttendance)
                return null;
            return newAttendance;
        });
        this.updateAttendanceKey = (key, id) => __awaiter(this, void 0, void 0, function* () {
            if (!key)
                return null;
            const attendanceToUpdate = yield Attendance_model_1.default.findByPk(id);
            if (!attendanceToUpdate)
                return null;
            yield attendanceToUpdate.update({ [key]: attendanceToUpdate[key] });
            return attendanceToUpdate;
        });
        this.updateAttendance = (attendance) => {
            if (!attendance)
                return null;
            if (attendance.id)
                this.id = attendance.id;
            const attendanceKeys = Object.keys(attendance);
            if (!attendanceKeys || attendanceKeys.length === 0)
                return null;
            attendanceKeys.forEach((key) => this.updateAttendanceKey(key, this.id));
            // if (attendance.customerUserId) {
            //   await attendanceToUpdate.update({
            //     customerUserId: attendance.customerUserId,
            //   });
            // }
            // if (attendance.professionalUserId) {
            //   await attendanceToUpdate.update({
            //     professionalUserId: attendance.professionalUserId,
            //   });
            // }
            // if (attendance.date) {
            //   await attendanceToUpdate.update({
            //     date: attendance.date,
            //   });
            // }
            // if (attendance.appointmentHour) {
            //   await attendanceToUpdate.update({
            //     appointmentHour: attendance.appointmentHour,
            //   });
            // }
            // if (attendance.totalPrice) {
            //   await attendanceToUpdate.update({
            //     totalPrice: attendance.totalPrice,
            //   });
            // }
            // if (attendance.installmentsQuantity) {
            //   await attendanceToUpdate.update({
            //     installmentsQuantity: attendance.installmentsQuantity,
            //   });
            // }
            // return attendanceToUpdate;
        };
        this.deleteAttendance = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = Number(receivedId);
            const attendanceToDelete = yield Attendance_model_1.default.findByPk(this.id);
            if (attendanceToDelete)
                yield attendanceToDelete.destroy();
            return attendanceToDelete;
        });
        Attendances.model = new Attendance_model_1.default();
    }
}
_a = Attendances;
Attendances.attendanceExists = (recAttendance) => __awaiter(void 0, void 0, void 0, function* () {
    const attendance = yield Attendance_model_1.default.findOne({
        where: {
            customerUserId: recAttendance.customerUserId,
            professionalUserId: recAttendance.professionalUserId,
            date: recAttendance.date,
            totalPrice: recAttendance.totalPrice,
            installmentsQuantity: recAttendance.installmentsQuantity,
        },
    });
    const exists = !!attendance;
    return exists;
});
exports.default = Attendances;
