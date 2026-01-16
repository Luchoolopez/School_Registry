import { StudentController } from '../../../src/controllers/student.controller';

describe('StudentController', () => {
  let controller: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    controller = new StudentController();
    controller.studentService = {
      createStudent: jest.fn(),
      getStudentsBySchool: jest.fn(),
      getStudentById: jest.fn(),
      updateStudent: jest.fn(),
      deleteStudent: jest.fn()
    };

    req = { user: { id: 1 }, params: {}, body: {} };
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    res = { status, json };
  });

  afterEach(() => jest.clearAllMocks());

  it('creates a student and returns 201', async () => {
    req.params.schoolId = '10';
    req.body = { first_name: 'A', last_name: 'B' };
    controller.studentService.createStudent.mockResolvedValue({ id: 5 });

    await controller.createStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status().json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

  it('returns 400 for invalid schoolId', async () => {
    req.params.schoolId = 'abc';
    await controller.createStudent(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns students list', async () => {
    req.params.schoolId = '20';
    controller.studentService.getStudentsBySchool.mockResolvedValue([{ id: 1 }]);

    await controller.getStudentsBySchool(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith(expect.objectContaining({ success: true, data: [{ id: 1 }] }));
  });

  it('gets student by id', async () => {
    req.params.id = '3';
    controller.studentService.getStudentById.mockResolvedValue({ id: 3 });

    await controller.getStudentById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith(expect.objectContaining({ success: true, data: { id: 3 } }));
  });

  it('updates student', async () => {
    req.params.id = '4';
    req.body = { first_name: 'X' };
    controller.studentService.updateStudent.mockResolvedValue({ id: 4, first_name: 'X' });

    await controller.updateStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

  it('deletes student', async () => {
    req.params.id = '6';
    controller.studentService.deleteStudent.mockResolvedValue(true);

    await controller.deleteStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });
});
