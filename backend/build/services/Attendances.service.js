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
                include: [
                    { model: User_model_1.default, as: 'attendant', attributes: { exclude: ['birthDate', 'rg', 'cpf', 'createdAt', 'updatedAt'] } },
                    { model: User_model_1.default, as: 'patient', attributes: { exclude: ['rg', 'cpf', 'createdAt', 'updatedAt'] } },
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
        // public updateAttendanceKey = async (key: keyof IAttendance, id: number): Promise<IAttendance | null> => {
        //   if (!key) return null;
        //   const attendanceToUpdate = await Attendance.findByPk(id);
        //   if (!attendanceToUpdate) return null;
        //   console.log('ATTENDANCE_TO_UPDATE', attendanceToUpdate);
        //   await attendanceToUpdate.update({ [key]: attendanceToUpdate[key] });
        //   console.log('ATTENDANCE_UPDATED?', attendanceToUpdate);
        //   return attendanceToUpdate;
        // };
        this.updateAttendance = (attendance) => __awaiter(this, void 0, void 0, function* () {
            if (!attendance)
                return null;
            if (attendance.id)
                this.id = attendance.id;
            // const attendanceKeys = Object.keys(attendance) as Array<keyof IAttendance>;
            // if (!attendanceKeys || attendanceKeys.length === 0) return null;
            // console.log('ATTENDANCE_KEYS', attendanceKeys);
            // const updatedAttendance = attendanceKeys.forEach((key) => {
            //   if (key !== 'id') {
            //     this.updateAttendanceKey(key, this.id);
            //   }
            // });
            const attendanceToUpdate = yield Attendance_model_1.default.findByPk(this.id);
            if (!attendanceToUpdate)
                return null;
            if (attendance.customerUserId) {
                yield attendanceToUpdate.update({
                    customerUserId: attendance.customerUserId,
                });
            }
            if (attendance.professionalUserId) {
                yield attendanceToUpdate.update({
                    professionalUserId: attendance.professionalUserId,
                });
            }
            if (attendance.date) {
                yield attendanceToUpdate.update({
                    date: attendance.date,
                });
            }
            if (attendance.appointmentHour) {
                yield attendanceToUpdate.update({
                    appointmentHour: attendance.appointmentHour,
                });
            }
            if (attendance.totalPrice) {
                yield attendanceToUpdate.update({
                    totalPrice: attendance.totalPrice,
                });
            }
            if (attendance.installmentsQuantity) {
                yield attendanceToUpdate.update({
                    installmentsQuantity: attendance.installmentsQuantity,
                });
            }
            return attendanceToUpdate;
        });
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
