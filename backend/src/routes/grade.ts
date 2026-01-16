import { Router } from "express";
import { GradeController } from "../controllers/grade.controller";
import {authenticate} from "../middlewares/auth";
import { validateSchema } from "../middlewares/validateSchema";
import { createGradeSchema, updateGradeSchema } from "../validations/grade.schema";

const gradeRouter = Router();
const gradeController = new GradeController();

gradeRouter.use(authenticate);

gradeRouter.post('/student/:studentId', validateSchema(createGradeSchema), gradeController.createGrade);
gradeRouter.put('/:id', validateSchema(updateGradeSchema), gradeController.updateGrade);
gradeRouter.delete('/:id', gradeController.deleteGrade);

export default gradeRouter;
export {gradeRouter as Router};