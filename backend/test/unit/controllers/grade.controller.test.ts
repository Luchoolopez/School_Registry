import { GradeController } from '../../../src/controllers/grade.controller';
import { ValidationError as SequelizeValidationError } from 'sequelize';

describe('GradeController', () => {
  let controller: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    controller = new GradeController();
    controller.gradeService = {
      addGrade: jest.fn(),
      updateGrade: jest.fn(),
      deleteGrade: jest.fn()
    };

    req = { user: { id: 1 }, params: {}, body: {} };
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    res = { status, json };
  });

  afterEach(() => jest.clearAllMocks());

  it('creates a grade and returns 201', async () => {
    req.params.studentId = '10';
    req.body = { concept: 'P1', value: 8, date: '2025-01-01' };
    controller.gradeService.addGrade.mockResolvedValue({ id: 2 });

    await controller.createGrade(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status().json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

  it('handles Sequelize validation error on create', async () => {
    req.params.studentId = '10';
    req.body = { concept: '', value: 100, date: 'bad' };

    const validationError = new SequelizeValidationError('validation', []);
    controller.gradeService.addGrade.mockRejectedValue(validationError);

    await controller.createGrade(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('updates a grade', async () => {
    req.params.id = '5';
    req.body = { value: 9 };
    controller.gradeService.updateGrade.mockResolvedValue({ id: 5, value: 9 });

    await controller.updateGrade(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('deletes a grade', async () => {
    req.params.id = '7';
    controller.gradeService.deleteGrade.mockResolvedValue(true);

    await controller.deleteGrade(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
