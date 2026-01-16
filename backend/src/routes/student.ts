import { Router } from "express";
import { StudentController } from "../controllers/student.controller";
import { authenticate } from "../middlewares/auth";
import { validateSchema } from "../middlewares/validateSchema";
import { createStudentSchema, updateStudentSchema } from "../validations/student.schema";

const studentRouter = Router();
const studentController = new StudentController();

studentRouter.use(authenticate);

studentRouter.get('/school/:schoolId', studentController.getStudentsBySchool);
studentRouter.post('/school/:schoolId', validateSchema(createStudentSchema), studentController.createStudent);
studentRouter.get('/:id', studentController.getStudentById);
studentRouter.put('/:id', validateSchema(updateStudentSchema), studentController.updateStudent);
studentRouter.delete('/:id', studentController.deleteStudent);

export default studentRouter;
export {studentRouter as Router};
