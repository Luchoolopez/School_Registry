import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";

export class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const result = await this.authService.login(username, password);
            return res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                data: result
            });
        } catch (error: any) {
            if (error.message === 'Credenciales inválidas') {
                return res.status(401).json({
                    success: false,
                    message: 'Email o contraseñas incorrectos'
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor ',
                error: error.message
            });
        }
    };

    register = async (req: Request, res: Response) => {
        try {
            const { username, dni, password, role } = req.body;
            const newUser = await this.authService.register({ username, dni, password, role });
            return res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: newUser
            });
        } catch (error: any) {
            if (error.message === 'El DNI ya está registrado') {
                return res.status(401).json({
                    success: false,
                    message: 'El DNI ya está registrado'
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

}