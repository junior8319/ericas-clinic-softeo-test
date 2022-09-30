import Attendance from "../database/models/Attendance.model";
import User from "../database/models/User.model";
import IAttendance from '../interfaces/attendance.interface';

class Attendances {
  static model: Attendance;

  public id!: number;

  constructor() {
    Attendances.model = new Attendance();
  }

  public getAttendances = async (): Promise<IAttendance[] | null> => {
    const attendancesList: IAttendance[] | null = await Attendance.findAll({
      include: [
        { model: User, as: 'attendant', attributes: { exclude: ['birthDate', 'rg', 'cpf', 'createdAt', 'updatedAt'] }},
        { model: User, as: 'patient', attributes: { exclude: ['rg', 'cpf', 'createdAt', 'updatedAt'] }},
      ],
    });
    if (!attendancesList) return null;

    return attendancesList;
  };

  static attendanceExists = async (recAttendance: IAttendance): Promise<boolean> => {
    const attendance: IAttendance |  null = await Attendance.findOne({
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
  };

  public createAttendance = async (attendance: IAttendance): Promise<IAttendance | null> => {
    if (!attendance) return null;

    const attendanceExists = await Attendances.attendanceExists(attendance);
    if (attendanceExists) return null;

    const newAttendance: IAttendance | null = await Attendance.create({ ...attendance });
    if (!newAttendance) return null;

    return newAttendance;
  };

  // public updateAttendanceKey = async (key: keyof IAttendance, id: number): Promise<IAttendance | null> => {
  //   if (!key) return null;

  //   const attendanceToUpdate = await Attendance.findByPk(id);
  //   if (!attendanceToUpdate) return null;
  //   console.log('ATTENDANCE_TO_UPDATE', attendanceToUpdate);
    
  //   await attendanceToUpdate.update({ [key]: attendanceToUpdate[key] });
  //   console.log('ATTENDANCE_UPDATED?', attendanceToUpdate);

  //   return attendanceToUpdate;
  // };

  public updateAttendance = async (attendance: IAttendance): Promise<IAttendance | null> => {
    if (!attendance) return null;

    if (attendance.id) this.id = attendance.id;

    // const attendanceKeys = Object.keys(attendance) as Array<keyof IAttendance>;
    // if (!attendanceKeys || attendanceKeys.length === 0) return null;
    // console.log('ATTENDANCE_KEYS', attendanceKeys);

    // const updatedAttendance = attendanceKeys.forEach((key) => {
    //   if (key !== 'id') {
    //     this.updateAttendanceKey(key, this.id);
    //   }
    // });

    const attendanceToUpdate = await Attendance.findByPk(this.id);
    if (!attendanceToUpdate) return null;

    
    if (attendance.customerUserId) {
      await attendanceToUpdate.update({
        customerUserId: attendance.customerUserId,
      });
    }

    if (attendance.professionalUserId) {
      await attendanceToUpdate.update({
        professionalUserId: attendance.professionalUserId,
      });
    }

    if (attendance.date) {
      await attendanceToUpdate.update({
        date: attendance.date,
      });
    }

    if (attendance.appointmentHour) {
      await attendanceToUpdate.update({
        appointmentHour: attendance.appointmentHour,
      });
    }

    if (attendance.totalPrice) {
      await attendanceToUpdate.update({
        totalPrice: attendance.totalPrice,
      });
    }

    if (attendance.installmentsQuantity) {
      await attendanceToUpdate.update({
        installmentsQuantity: attendance.installmentsQuantity,
      });
    }

    return attendanceToUpdate;
  };

  public deleteAttendance = async (receivedId: string): Promise<IAttendance | null> => {
    if (!receivedId) return null;

    this.id = Number(receivedId);

    const attendanceToDelete = await Attendance.findByPk(this.id);

    if (attendanceToDelete) await attendanceToDelete.destroy();

    return attendanceToDelete;
  };
}

export default Attendances;
