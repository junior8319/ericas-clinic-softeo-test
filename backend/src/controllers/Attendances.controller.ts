import { NextFunction, Request, Response } from 'express';
import AttendancesService from '../services/Attendances.service';
import IAttendance from '../interfaces/attendance.interface';

class Attendances {
  public service: AttendancesService;

  constructor() {
    this.service = new AttendancesService();
  }

  public getAttendances = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const attendancesList: IAttendance[] | null = await this.service.getAttendances();
      if (!attendancesList) return res.status(404)
        .json({ message: 'Não encontramos atendimentos.' });

      return res.status(200).json(attendancesList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newAttendance = req.body;

      const createdAttendance: IAttendance | null = await this.service.createAttendance(newAttendance);
      if (!createdAttendance) {
        return res.status(400)
        .json({
          message: `Não foi possível criar atendimento com os dados ${newAttendance}`,
        });
      }

      return res.status(201).json(createdAttendance);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id || !req.body) return res.status(400)
        .json({ message: 'Sem dado para atualizar' });
      
      const attendance = { ...req.body, id };
      
      await this.service.updateAttendance(attendance);

      return res.status(200).json(attendance);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400)
        .json({
          message: 'Por favor, nos passe um identificador(id) para excluir.',
        });
      
      const attendanceDeleted = await this.service.deleteAttendance(id);
      if(!attendanceDeleted) return res.status(404)
        .json({ message: `Não encontramos atendimento com o id ${id}` });

      return res.status(202).json({ message: 'Registro excluído com sucesso' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new Attendances();
