const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

// fake user for testing:
const mockUser = {
  email: 'test@example.com',
  password: '12345'
};

const mockUser2 = {
  email: 'test2@example.com',
  password: '12345'
};

describe('user sign in and sign up routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users/sessions').send(mockUser);
    const { email } = mockUser;
    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
  });

  it('delete route logs out a user', async () => {
    // add user
    const addRes = await request(app).post('/api/v1/users').send(mockUser2);
    console.log('addRes', addRes.body);
    expect(addRes.status).toBe(200);

    // delete user
    const deleteRes = await request(app).delete('/api/v1/users/5');
    console.log('deleteRes', deleteRes.body);
    expect(deleteRes.status).toBe(200);
  });

  afterAll(() => {
    pool.end();
  });
});
