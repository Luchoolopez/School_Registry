import { createAbsenceSchema } from '../../../src/validations/absence.schema';

describe('absence.schema validation', () => {
  it('accepts valid input', async () => {
    const input = { body: { date: '2025-01-02' }, params: { studentId: 1 } };
    await expect(createAbsenceSchema.parseAsync(input)).resolves.toBeDefined();
  });

  it('rejects invalid date', async () => {
    const input = { body: { date: 'not-a-date' }, params: { studentId: 1 } };
    await expect(createAbsenceSchema.parseAsync(input)).rejects.toThrow();
  });
});
