import bcrypt from 'bcryptjs';
import { User } from '../models/User.model';

export class UserService {
    async getAll(includeInactive = false) {
        const where = includeInactive ? {} : { active: true } as any;
        const users = await User.findAll({ where, order: [['username', 'ASC']] });
        return users.map(u => {
            const { password, ...rest } = u.get({ plain: true }) as any;
            return rest;
        });
    }

    async getById(id: number) {
        const user = await User.findByPk(id as any);
        if (!user) throw new Error('Usuario no encontrado');
        const { password, ...rest } = user.get({ plain: true }) as any;
        return rest;
    }

    async updateUser(id: number, data: Partial<{ username: string; dni: string; role: 'admin' | 'docente'; password?: string; active?: boolean }>) {
        const user = await User.findByPk(id as any);
        if (!user) throw new Error('Usuario no encontrado');

        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(data.password, salt);
            data.password = hashed;
        }

        await user.update(data as any);
        const { password, ...rest } = user.get({ plain: true }) as any;
        return rest;
    }

    async deactivateUser(id: number) {
        const user = await User.findByPk(id as any);
        if (!user) throw new Error('Usuario no encontrado');
        await user.update({ active: false } as any);
        return true;
    }
}

