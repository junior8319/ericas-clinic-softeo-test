import express, { NextFunction, Request, Response } from 'express';
import AttendancesService from '../services/Attendances.service';
import invalidDates from '../helpers/testDates.helper';

class AttendancesMiddleware {
  public app: express.Application;

  public service: AttendancesService;

  public id!: number;

  public customerUserId!: number;
  
  public professionalUserId!: number;

  public date!: Date;

  public appointmentHour!: Date;

  public totalPrice!: number;

  public installmentsQuantity!: number;

  constructor() {
    this.app = express();
    this.service = new AttendancesService();
  }

  public validateCreateAttendance = async (req: Request, res: Response, next: NextFunction) => {
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
            message:
              'A data da consulta é requerida para o cadastro,' +
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

      if (invalidDates(this.date.toString())) {
        return res.status(400)
          .json({
            message: invalidDates(this.date.toString()),
          });
      }

      this.appointmentHour = newAttendance.appointmentHour;
      if (!this.appointmentHour) {
        return res.status(400)
          .json({
            message: 
              'O horário da consulta é requerido para o cadastro,' +
                ' favor informar (campo: "appointmentHour")',
          });
      }

      this.customerUserId = Number(newAttendance.customerUserId);
      if (!this.customerUserId || !Number(this.customerUserId)) {
        return res.status(400)
          .json({
            message:
              'É necessário informar a pessoa paciente a se consultar.' +
                ' Favor informar com o campo "customerUserId".',
          });
      }

      this.professionalUserId = Number(newAttendance.professionalUserId);
      if (!this.professionalUserId || !Number(this.professionalUserId)) {
        return res.status(400)
          .json({
            message:
              'É necessário informar a pessoa professional a atender a' +
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

      this.installmentsQuantity = Number(newAttendance.installmentsQuantity)
        if (!this.installmentsQuantity || !Number(this.installmentsQuantity)) {
          return res.status(400)
            .json({
              message: 'Você deve informar a quantidade de parcelas para' +
                ' pagamento desta consulta com o campo "installmentsQuantity"',
            });
        }

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new AttendancesMiddleware();
