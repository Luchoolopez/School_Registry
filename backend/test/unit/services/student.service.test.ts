import { StudentService } from '../../../src/services/student.service';

jest.mock('../../../src/models/School.model', () => ({
  School: {
    findOne: jest.fn()
  }
}));

jest.mock('../../../src/models/Student.model', () => ({
  Student: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn()
  }
}));

const { School } = require('../../../src/models/School.model');
const { Student } = require('../../../src/models/Student.model');

describe('StudentService', () => {
  const service = new StudentService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createStudent', () => {
    it('throws if school not found or not owned by user', async () => {
      School.findOne.mockResolvedValue(null);
      await expect(service.createStudent(1, 10, { first_name: 'A', last_name: 'B' })).rejects.toThrow(/Escuela no encontrada/);
    });

    it('creates a student when school exists', async () => {
      School.findOne.mockResolvedValue({ id: 10 });
      Student.create.mockResolvedValue({ id: 5, first_name: 'A', last_name: 'B', school_id: 10 });

      const result = await service.createStudent(1, 10, { first_name: 'A', last_name: 'B' });

      expect(Student.create).toHaveBeenCalledWith({ first_name: 'A', last_name: 'B', school_id: 10 });
      expect(result).toEqual({ id: 5, first_name: 'A', last_name: 'B', school_id: 10 });
    });
  });

  describe('getStudentsBySchool', () => {
    it('throws when school not found', async () => {
      School.findOne.mockResolvedValue(null);
      await expect(service.getStudentsBySchool(1, 20)).rejects.toThrow(/Escuela no encontrada/);
    });

    it('returns students when school exists', async () => {
      School.findOne.mockResolvedValue({ id: 20 });
      Student.findAll.mockResolvedValue([{ id: 1, first_name: 'A' }]);

      const result = await service.getStudentsBySchool(1, 20);
      expect(Student.findAll).toHaveBeenCalled();
      expect(result).toEqual([{ id: 1, first_name: 'A' }]);
    });
  });

  describe('getStudentById', () => {
    it('throws when student not found', async () => {
      Student.findOne.mockResolvedValue(null);
      await expect(service.getStudentById(1, 999)).rejects.toThrow(/Alumno no encontrado/);
    });

    it('returns student when found', async () => {
      Student.findOne.mockResolvedValue({ id: 999, first_name: 'X' });
      const res = await service.getStudentById(1, 999);
      expect(res).toEqual({ id: 999, first_name: 'X' });
    });
  });
});
