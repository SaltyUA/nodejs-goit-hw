const mongoose = require('mongoose');
const {
  beforeAll,
  afterAll,
  expect,
  describe,
  test,
} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');
const { DB_MONGO_HOST } = require('../helpers/env');

mongoose.set('strictQuery', false);

describe('POST /login', () => {
  beforeAll(async () => {
    await mongoose.connect(DB_MONGO_HOST);
  });
  const user = {
    email: 'test@gmail.com',
    password: '1111',
  };
  test('It should login user and return token', async () => {
    const logResponse = await request(app).post('/api/users/login').send(user);
    console.log(logResponse);
    expect(logResponse.status).toBe(200);
    expect(logResponse.body.token).toBeTruthy();
    expect(logResponse.body.user).toBeInstanceOf(Object);
    expect(typeof logResponse.body.user.email).toBe('string');
    expect(typeof logResponse.body.user.subscription).toBe('string');
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
