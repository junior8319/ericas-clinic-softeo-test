export default interface IAttendanceData {
  id: number;
  customerUserId: number;
  professionalUserId: number;
  date: Date;
  appointmentHour: Date;
  totalPrice: number;
  installmentsQuantity: number;
}