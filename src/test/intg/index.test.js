import supertest from 'supertest';
import server from '../../server';

const request = supertest(server);

describe('POST /ping', () => {
  it('shoudl tell if the server is alive', () => request
    .get('/ping')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        ok: true,
        message: 'Server is Alive',
      });
    }));
});


describe('POST /plan', () => {
  it('should run validation for request data', () => request
    .post('/plan')
    .send({
      serverType: { HDD: 100, RAM: 32 },
      virtualMachines: [
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 100, CPU: 2, RAM: 32 },
      ],
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({
        ok: false,
      });
    }));
  it('should calculate server requirement', () => request
    .post('/plan')
    .send({
      serverType: { HDD: 100, CPU: 2, RAM: 32 },
      virtualMachines: [
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 100, CPU: 2, RAM: 32 },
      ],
    })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        ok: true,
        data: 2,
      });
    }));
  it('should skip too large virtual machines', () => request
    .post('/plan')
    .send({
      serverType: { HDD: 100, CPU: 2, RAM: 32 },
      virtualMachines: [
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 110, CPU: 2, RAM: 32 },
      ],
    })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        ok: true,
        data: 1,
      });
    }));
});
