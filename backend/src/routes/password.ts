import { Router } from 'express';
import { forgotPassword, resetPassword } from '../controllers/password.controller';

const router = Router();

router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);

export default router;
export { router as Router };
