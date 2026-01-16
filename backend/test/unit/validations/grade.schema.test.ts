import { createGradeSchema } from '../../../src/validations/grade.schema';

describe('grade.schema validation', () => {
  it('accepts valid input', async () => {
    const input = { body: { concept: 'P1', value: 7, date: '2025-01-01' }, params: { studentId: 1 } };
    await expect(createGradeSchema.parseAsync(input)).resolves.toBeDefined();
  });

  it('rejects invalid date', async () => {
    const input = { body: { concept: 'P1', value: 7, date: 'bad' }, params: { studentId: 1 } };
    await expect(createGradeSchema.parseAsync(input)).rejects.toThrow();
  });
});
