import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UpdateUserInput } from '../validations/user.schema';

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  list = async (req: Request, res: Response) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Acceso denegado' });
      }

      const includeInactive = req.query.includeInactive === 'true';
      const users = await this.userService.getAll(includeInactive);
      return res.status(200).json({ success: true, data: users });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Acceso denegado' });
      }

      const id = Number(req.params.id);
      const user = await this.userService.getById(id);
      return res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      return res.status(404).json({ success: false, message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Acceso denegado' });
      }

      const id = Number(req.params.id);
      const data = req.body as UpdateUserInput;
      const updated = await this.userService.updateUser(id, data);
      return res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };

  deactivate = async (req: Request, res: Response) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Acceso denegado' });
      }

      const id = Number(req.params.id);
      await this.userService.deactivateUser(id);
      return res.status(200).json({ success: true, message: 'Usuario desactivado' });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };
}

export default new UserController();
