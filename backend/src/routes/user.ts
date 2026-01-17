import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { validateSchema } from '../middlewares/validateSchema';
import UserController from '../controllers/user.controller';
import { updateUserSchema } from '../validations/user.schema';

const userRouter = Router();

userRouter.get('/', authenticate, UserController.list);
userRouter.get('/:id', authenticate, UserController.get);
userRouter.put('/:id', authenticate, validateSchema(updateUserSchema), UserController.update);
userRouter.patch('/:id/toggle', authenticate, UserController.toggleStatus);
userRouter.delete('/:id', authenticate, UserController.deletePermanent);

export default userRouter;
export { userRouter as Router };
