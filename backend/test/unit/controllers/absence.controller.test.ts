import { AbsenceController } from '../../../src/controllers/absence.controller';

describe('AbsenceController', () => {
  let controller: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    controller = new AbsenceController();
    controller.absenceService = {
      createAbsence: jest.fn(),
      toggleJustification: jest.fn(),
      deleteAbsence: jest.fn()
    };

    req = { user: { id: 1 }, params: {}, body: {} };
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    res = { status, json };
  });

  afterEach(() => jest.clearAllMocks());

  it('creates an absence and returns 201', async () => {
    req.params.studentId = '12';
    req.body = { date: '2025-01-02' };
    controller.absenceService.createAbsence.mockResolvedValue({ id: 3 });

    await controller.createAbsence(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status().json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

  it('toggles justification', async () => {
    req.params.id = '1';
    controller.absenceService.toggleJustification.mockResolvedValue({ id: 1, justified: true });

    await controller.toggleJustification(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('deletes absence', async () => {
    req.params.id = '2';
    controller.absenceService.deleteAbsence.mockResolvedValue(true);

    await controller.deleteAbsence(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
