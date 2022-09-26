import { Router } from 'express';
import AttendancesController from '../controllers/Attendances.controller';
import errorMiddleware from '../middlewares/error.middleware';

const attendancesRouter = Router();

attendancesRouter.get(
  '/attendances',
  AttendancesController.getAttendances,
  errorMiddleware.handleErrors,
);

attendancesRouter.post(
  '/attendances',
  AttendancesController.createAttendance,
  errorMiddleware.handleErrors,
);

attendancesRouter.put(
  '/attendances/:id',
  AttendancesController.updateAttendance,
  errorMiddleware.handleErrors,
);

attendancesRouter.delete(
  '/attendances/:id',
  AttendancesController.deleteAttendance,
  errorMiddleware.handleErrors,
);

export default attendancesRouter;
