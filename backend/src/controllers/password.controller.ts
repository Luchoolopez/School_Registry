import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.json({ success: true, message: 'Si el usuario existe, se envió un correo.' });
    }

    const secret = process.env.JWT_SECRET + user.password;
    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

    const emailService = (await import('../services/email.service')).default;
    await emailService.sendPasswordResetLink(user.email, token, user.username);

    res.json({ success:true, message: 'Correo enviado correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message: 'Error interno' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ success:false, message: 'Token y contraseña son requeridos' });

    const decoded: any = jwt.decode(token);
    if (!decoded || !decoded.id) return res.status(400).json({ success:false, message: 'Token inválido' });

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(400).json({ success:false, message: 'Usuario no encontrado' });

    const secret = process.env.JWT_SECRET + user.password;
    jwt.verify(token, secret);

    await userService.updateUser(user.id, { password });

    res.json({ success:true, message: 'Contraseña actualizada correctamente' });
  } catch (error: any) {
    console.error('Error en resetPassword:', error);
    return res.status(400).json({ success:false, message: error.message || 'Error' });
  }
};

export default { forgotPassword, resetPassword };
