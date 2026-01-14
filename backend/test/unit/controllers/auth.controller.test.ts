import { AuthController } from '../../../src/controllers/auth.controller';
import { AuthService } from '../../../src/services/auth.service';
import { Request, Response } from 'express';

// Mock AuthService
jest.mock('../../../src/services/auth.service');

describe('AuthController', () => {
    let authController: AuthController;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        authController = new AuthController();
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        mockRes = {
            status: statusMock
        };
        mockReq = {};
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should return 200 and data on successful login', async () => {
            mockReq.body = { username: 'user', password: 'pass' };
            const mockResult = { token: 'tkn', user: { id: 1, username: 'user' } };
            (AuthService.prototype.login as jest.Mock).mockResolvedValue(mockResult);

            await authController.login(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'Inicio de sesión exitoso',
                data: mockResult
            });
        });

        it('should return 401 on invalid credentials', async () => {
            mockReq.body = { username: 'user', password: 'wrong' };
            (AuthService.prototype.login as jest.Mock).mockRejectedValue(new Error('Credenciales inválidas'));

            await authController.login(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(401);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                message: 'Email o contraseñas incorrectos'
            });
        });

        it('should return 500 on internal server error', async () => {
            mockReq.body = { username: 'user', password: 'pass' };
            (AuthService.prototype.login as jest.Mock).mockRejectedValue(new Error('Database error'));

            await authController.login(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: 'Error interno del servidor '
            }));
        });
    });

    describe('register', () => {
        it('should return 201 and user data on successful registration', async () => {
            mockReq.body = { username: 'new', dni: '123', password: 'pass', role: 'docente' };
            const mockUser = { id: 1, ...mockReq.body };
            (AuthService.prototype.register as jest.Mock).mockResolvedValue(mockUser);

            await authController.register(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: mockUser
            });
        });

        it('should return 401 if DNI is already registered', async () => {
            mockReq.body = { username: 'new', dni: '123' };
            (AuthService.prototype.register as jest.Mock).mockRejectedValue(new Error('El DNI ya está registrado'));

            await authController.register(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(401);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                message: 'El DNI ya está registrado'
            });
        });
    });
});
