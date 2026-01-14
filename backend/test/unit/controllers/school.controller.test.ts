import { SchoolController } from '../../../src/controllers/school.controller';
import { SchoolService } from '../../../src/services/school.service';
import { Request, Response } from 'express';

jest.mock('../../../src/services/school.service');

describe('SchoolController', () => {
    let schoolController: SchoolController;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        schoolController = new SchoolController();
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        mockRes = {
            status: statusMock
        };
        mockReq = {
            user: { id: 1, role: 'admin', username: 'test' } as any
        };
        jest.clearAllMocks();
    });

    describe('createSchool', () => {
        it('should return 201 on success', async () => {
            mockReq.body = { name: 'New School', academic_year: 2024 };
            (SchoolService.prototype.createSchool as jest.Mock).mockResolvedValue({ id: 1, ...mockReq.body });

            await schoolController.createSchool(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        });

        it('should return 400 if school already exists', async () => {
            (SchoolService.prototype.createSchool as jest.Mock).mockRejectedValue(new Error('Ya tienes registrada la escuela'));

            await schoolController.createSchool(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({ success: false, message: 'Ya tienes registrada la escuela' });
        });
    });

    describe('getUsersSchools', () => {
        it('should return 200 and list', async () => {
            (SchoolService.prototype.getUsersSchools as jest.Mock).mockResolvedValue([]);
            await schoolController.getUsersSchools(mockReq as Request, mockRes as Response);
            expect(statusMock).toHaveBeenCalledWith(200);
        });
    });

    describe('updateSchool', () => {
        it('should return 200 on success', async () => {
            mockReq.params = { id: '1' };
            mockReq.body = { name: 'Up' };
            (SchoolService.prototype.updateSchool as jest.Mock).mockResolvedValue({ id: 1, name: 'Up' });

            await schoolController.updateSchool(mockReq as Request, mockRes as Response);
            expect(statusMock).toHaveBeenCalledWith(200);
        });

        it('should return 404 if not found', async () => {
            mockReq.params = { id: '1' };
            (SchoolService.prototype.updateSchool as jest.Mock).mockRejectedValue(new Error('Escuela no encontrada'));

            await schoolController.updateSchool(mockReq as Request, mockRes as Response);
            expect(statusMock).toHaveBeenCalledWith(404);
        });
    });

    describe('deleteSchool', () => {
        it('should return 200 on success', async () => {
            mockReq.params = { id: '1' };
            (SchoolService.prototype.deleteSchool as jest.Mock).mockResolvedValue(true);

            await schoolController.deleteSchool(mockReq as Request, mockRes as Response);
            expect(statusMock).toHaveBeenCalledWith(200);
        });

        it('should return 404 if not found', async () => {
            mockReq.params = { id: '1' };
            (SchoolService.prototype.deleteSchool as jest.Mock).mockRejectedValue(new Error('Escuela no encontrada'));

            await schoolController.deleteSchool(mockReq as Request, mockRes as Response);
            expect(statusMock).toHaveBeenCalledWith(404);
        });
    });
});
