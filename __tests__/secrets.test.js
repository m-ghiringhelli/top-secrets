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

describe('secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET from /secrets should only be allowed if signed in', async () => {
    const res1 = await request(app).get('/api/v1/secrets');
    expect(res1.error.status).toBe(401);

    const [agent] = await registerAndLogin();
    const res2 = await agent.get('/api/v1/secrets');
    expect(res2.status).toBe(200);
  });

  afterAll(() => {
    pool.end();
  });
});
