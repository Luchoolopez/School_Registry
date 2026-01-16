import { createStudentSchema } from '../../../src/validations/student.schema';

describe('student.schema validation', () => {
  it('accepts valid input', async () => {
    const input = { body: { first_name: 'A', last_name: 'B' } };
    await expect(createStudentSchema.parseAsync(input)).resolves.toBeDefined();
  });

  it('rejects missing fields', async () => {
    const input = { body: { first_name: '' } };
    await expect(createStudentSchema.parseAsync(input)).rejects.toThrow();
  });
});
