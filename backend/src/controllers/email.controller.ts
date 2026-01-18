import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import emailService from '../services/email.service'; 

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } }); 

    if (!user) {
      return res.json({ message: 'Si el usuario existe, se envió un correo.' });
    }

    const secret = process.env.JWT_SECRET + user.password;
    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

    await emailService.sendPasswordResetLink(user.email, token, user.username);

    res.json({ success:true, message: 'Correo enviado correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message: 'Error interno' });
  }
};