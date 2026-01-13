import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserCreationAttributes } from '../models/User.model';

export class AuthService {

  async login(username: string, passwordPlain: string) {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(passwordPlain, user.password);
    if (!isMatch) {
      throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      process.env.JWT_SECRET || 'secreto_super_seguro_por_defecto',
      { expiresIn: '12h' }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        dni: user.dni,
        role: user.role
      }
    };
  }

  async register(data: UserCreationAttributes) {
    const existingDni = await User.findOne({
      where: { dni: data.dni }
    });

    if (existingDni) throw new Error('El DNI ya está registrado');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = await User.create({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  }
}