import { SchoolService } from '../../../src/services/school.service';
import { School } from '../../../src/models/School.model';

// Mock School model
jest.mock('../../../src/models/School.model');

describe('SchoolService', () => {
    let schoolService: SchoolService;

    beforeEach(() => {
        schoolService = new SchoolService();
        jest.clearAllMocks();
    });

    describe('createSchool', () => {
        const mockInput = { name: 'Escuela Test', academic_year: 2024 };
        const userId = 1;

        it('should create a school successfully', async () => {
            (School.findOne as jest.Mock).mockResolvedValue(null);
            (School.create as jest.Mock).mockResolvedValue({ ...mockInput, id: 1, user_id: userId });

            const result = await schoolService.createSchool(userId, mockInput as any);

            expect(School.findOne).toHaveBeenCalled();
            expect(School.create).toHaveBeenCalledWith({ ...mockInput, user_id: userId });
            expect(result).toHaveProperty('id', 1);
        });

        it('should throw error if school already exists', async () => {
            (School.findOne as jest.Mock).mockResolvedValue({ id: 1, ...mockInput });

            await expect(schoolService.createSchool(userId, mockInput as any))
                .rejects.toThrow(`Ya tienes registrada la escuela "${mockInput.name}" para el año ${mockInput.academic_year}`);
        });
    });

    describe('getUsersSchools', () => {
        it('should return list of schools', async () => {
            const mockSchools = [{ id: 1, name: 'S1' }];
            (School.findAll as jest.Mock).mockResolvedValue(mockSchools);

            const result = await schoolService.getUsersSchools(1);
            expect(School.findAll).toHaveBeenCalledWith(expect.objectContaining({ where: { user_id: 1 } }));
            expect(result).toEqual(mockSchools);
        });
    });

    describe('updateSchool', () => {
        it('should update school if found', async () => {
            const mockSchool = { id: 1, update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated' }) };
            (School.findOne as jest.Mock).mockResolvedValue(mockSchool);

            const result = await schoolService.updateSchool(1, 1, { name: 'Updated' } as any);

            expect(mockSchool.update).toHaveBeenCalledWith({ name: 'Updated' });
            expect(result).toHaveProperty('name', 'Updated');
        });

        it('should throw error if school not found', async () => {
            (School.findOne as jest.Mock).mockResolvedValue(null);
            await expect(schoolService.updateSchool(1, 1, { name: 'Up' } as any)).rejects.toThrow('Escuela no encontrada o no autorizada');
        });
    });

    describe('deleteSchool', () => {
        it('should delete school successfully', async () => {
            (School.destroy as jest.Mock).mockResolvedValue(1);
            const result = await schoolService.deleteSchool(1, 1);
            expect(result).toBe(true);
        });

        it('should throw error if school not found', async () => {
            (School.destroy as jest.Mock).mockResolvedValue(0);
            await expect(schoolService.deleteSchool(1, 1)).rejects.toThrow('Escuela no encontrada o no tienes permisos');
        });
    });
});
