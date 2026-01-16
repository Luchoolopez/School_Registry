import { AbsenceService } from '../../../src/services/absence.service';

jest.mock('../../../src/models/Student.model', () => ({
  Student: {
    findOne: jest.fn()
  }
}));

jest.mock('../../../src/models/Absence.model', () => ({
  Absence: {
    create: jest.fn(),
    findOne: jest.fn()
  }
}));

const { Student } = require('../../../src/models/Student.model');
const { Absence } = require('../../../src/models/Absence.model');

describe('AbsenceService', () => {
  const service = new AbsenceService();

  beforeEach(() => jest.clearAllMocks());

  describe('createAbsence', () => {
    it('throws if student not found or not owned', async () => {
      Student.findOne.mockResolvedValue(null);
      await expect(service.createAbsence(1, 12, { date: '2025-01-02', justified: false })).rejects.toThrow(/Estudiante no encontrado/);
    });

    it('creates absence when student exists', async () => {
      Student.findOne.mockResolvedValue({ id: 12 });
      Absence.create.mockResolvedValue({ id: 3, student_id: 12 });

      const res = await service.createAbsence(1, 12, { date: '2025-01-02', justified: false });
      expect(Absence.create).toHaveBeenCalledWith({ student_id: 12, date: '2025-01-02', justified: false });
      expect(res).toEqual({ id: 3, student_id: 12 });
    });
  });

  describe('toggleJustification', () => {
    it('throws when absence not found', async () => {
      Absence.findOne.mockResolvedValue(null);
      await expect(service.toggleJustification(1, 1)).rejects.toThrow(/Ausencia no encontrada/);
    });

    it('toggles justification when found', async () => {
      Absence.findOne.mockResolvedValue({ id: 1, justified: false, update: jest.fn().mockResolvedValue({ id: 1, justified: true }) });
      const res = await service.toggleJustification(1, 1);
      expect(res).toEqual({ id: 1, justified: true });
    });
  });

  describe('deleteAbsence', () => {
    it('throws when absence not found', async () => {
      Absence.findOne.mockResolvedValue(null);
      await expect(service.deleteAbsence(1, 2)).rejects.toThrow(/Ausencia no encontrada/);
    });

    it('destroys when found', async () => {
      const destroyMock = jest.fn().mockResolvedValue(true);
      Absence.findOne.mockResolvedValue({ id: 2, destroy: destroyMock });
      const res = await service.deleteAbsence(1, 2);
      expect(destroyMock).toHaveBeenCalled();
      expect(res).toBe(true);
    });
  });
});
