import { AuthService } from '../../../src/services/auth.service';
import { User } from '../../../src/models/User.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock dependencies
jest.mock('../../../src/models/User.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
        jest.clearAllMocks();
    });

    describe('login', () => {
        const mockUser = {
            id: 1,
            username: 'testu',
            password: 'hashedPassword',
            dni: '12345678',
            role: 'admin'
        };

        it('should login successfully with valid credentials', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue('mockToken');

            const result = await authService.login('testu', 'password123');

            expect(User.findOne).toHaveBeenCalledWith({ where: { username: 'testu' } });
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
            expect(result).toHaveProperty('token', 'mockToken');
            expect(result.user).toEqual({
                id: 1,
                username: 'testu',
                dni: '12345678',
                role: 'admin'
            });
        });

        it('should throw error if user not found', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);

            await expect(authService.login('wrongu', 'password')).rejects.toThrow('Credenciales inválidas');
        });

        it('should throw error if password does not match', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(authService.login('testu', 'wrongpass')).rejects.toThrow('Credenciales inválidas');
        });
    });

    describe('register', () => {
        const mockData = {
            username: 'newuser',
            password: 'password123',
            dni: '87654321',
            role: 'docente' as const
        };

        it('should register a new user successfully', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null); // No existing DNI
            (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
            (User.create as jest.Mock).mockResolvedValue({ ...mockData, id: 2, password: 'hashedPassword' });

            const result = await authService.register(mockData);

            expect(User.findOne).toHaveBeenCalledWith({ where: { dni: mockData.dni } });
            expect(bcrypt.hash).toHaveBeenCalledWith(mockData.password, 'salt');
            expect(User.create).toHaveBeenCalled();
            expect(result).toHaveProperty('id', 2);
        });

        it('should throw error if DNI already exists', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ id: 3, ...mockData });

            await expect(authService.register(mockData)).rejects.toThrow('El DNI ya está registrado');
        });
    });
});
