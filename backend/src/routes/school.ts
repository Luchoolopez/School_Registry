import { Router } from "express";
import { SchoolController } from "../controllers/school.controller";
import { authenticate } from "../middlewares/auth";
import { validateSchema } from "../middlewares/validateSchema";
import { createSchoolSchema, updateSchoolSchema } from "../validations/school.schema";

const schoolRouter = Router();
const schoolController = new SchoolController();

schoolRouter.use(authenticate);

schoolRouter.get('/', schoolController.getUsersSchools);
schoolRouter.post('/', validateSchema(createSchoolSchema), schoolController.createSchool);
schoolRouter.put('/:id', validateSchema(updateSchoolSchema), schoolController.updateSchool);
schoolRouter.delete('/:id', schoolController.deleteSchool);

export default schoolRouter;
export {schoolRouter as Router};