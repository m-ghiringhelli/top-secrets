const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

// fake user for testing:
const mockUser = {
  email: 'test@example.com',
  password: '12345'
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('user sign in and sign up routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
  });

  it('delete route logs out a user', async () => {
    // check for status message for logged out
    const [agent] = await registerAndLogin();
    const res = await agent.delete('/api/v1/users/sessions');
    expect(res.body.message).toEqual('Signed out successfully!');
  });

  it('GET from /secrets should only be allowed if signed in', async () => {
    const res1 = await request(app).get('/api/v1/secrets').getAll();
    expect(res1.message).toEqual('You must be signed in!!');

    const [agent] = await registerAndLogin();
    const res2 = await agent.get('/api/v1/secrets');
    expect(res2.body.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
