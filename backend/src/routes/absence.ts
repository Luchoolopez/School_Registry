import { Router } from "express";
import { AbsenceController } from "../controllers/absence.controller";
import { authenticate } from "../middlewares/auth";
import { validateSchema } from "../middlewares/validateSchema";
import { createAbsenceSchema } from "../validations/absence.schema";

const absenceRouter = Router();
const absenceController = new AbsenceController();

absenceRouter.use(authenticate);

absenceRouter.post('/student/:studentId', validateSchema(createAbsenceSchema), absenceController.createAbsence);
absenceRouter.patch('/:id/toggle', absenceController.toggleJustification);
absenceRouter.delete('/:id', absenceController.deleteAbsence);

export default absenceRouter;
export {absenceRouter as Router};