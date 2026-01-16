import { GradeService } from '../../../src/services/grade.service';

jest.mock('../../../src/models/Student.model', () => ({
  Student: {
    findOne: jest.fn()
  }
}));

jest.mock('../../../src/models/Grade.model', () => ({
  Grade: {
    create: jest.fn(),
    findOne: jest.fn()
  }
}));

const { Student } = require('../../../src/models/Student.model');
const { Grade } = require('../../../src/models/Grade.model');

describe('GradeService', () => {
  const service = new GradeService();

  beforeEach(() => jest.clearAllMocks());

  describe('addGrade', () => {
    it('throws if student not found or not owned', async () => {
      Student.findOne.mockResolvedValue(null);
      await expect(service.addGrade(1, 10, { concept: 'P1', value: 8, date: '2025-01-01' })).rejects.toThrow(/Alumno no encontrado/);
    });

    it('creates grade when student exists', async () => {
      Student.findOne.mockResolvedValue({ id: 10 });
      Grade.create.mockResolvedValue({ id: 2, student_id: 10 });

      const res = await service.addGrade(1, 10, { concept: 'P1', value: 8, date: '2025-01-01' });
      expect(Grade.create).toHaveBeenCalledWith({ student_id: 10, concept: 'P1', value: 8, date: '2025-01-01' });
      expect(res).toEqual({ id: 2, student_id: 10 });
    });
  });

  describe('updateGrade', () => {
    it('throws if grade not found', async () => {
      Grade.findOne.mockResolvedValue(null);
      await expect(service.updateGrade(1, 5, { value: 9 })).rejects.toThrow(/Nota no encontrada/);
    });

    it('updates when found', async () => {
      Grade.findOne.mockResolvedValue({ id: 5, update: jest.fn().mockResolvedValue({ id: 5, value: 9 }) });
      const res = await service.updateGrade(1, 5, { value: 9 });
      expect(res).toEqual({ id: 5, value: 9 });
    });
  });

  describe('deleteGrade', () => {
    it('throws if grade not found', async () => {
      Grade.findOne.mockResolvedValue(null);
      await expect(service.deleteGrade(1, 7)).rejects.toThrow(/Nota no encontrada/);
    });

    it('destroys when found', async () => {
      const destroyMock = jest.fn().mockResolvedValue(true);
      Grade.findOne.mockResolvedValue({ id: 7, destroy: destroyMock });
      const res = await service.deleteGrade(1, 7);
      expect(destroyMock).toHaveBeenCalled();
      expect(res).toBe(true);
    });
  });
});
