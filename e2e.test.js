import mongoose from 'mongoose';
import request from 'supertest';
import { app, serverInstance } from './index';
import { RollerPlace } from './models/rollerplace.model';
import { User } from './models/user.model';

describe('Given app', () => {
  afterAll(() => {
    mongoose.disconnect();
    serverInstance.close();
  });

  beforeAll(async () => {
    await User.deleteMany({});
    await RollerPlace.deleteMany({});
  });

  let idUser;
  let tokenUser;

  describe('Testing USERS to create an user', () => {
    describe('When GET /users', () => {
      test('It returns status 200', async () => {
        const response = await request(app).post('/users').send({
          name: 'German',
          email: 'german@test.es',
          password: '1234',
          favorites: [],
          myrollerplaces: [],
        });
        expect(response.status).toBe(201);
      });
    });
  });

  describe('Testing LOGIN routes', () => {
    describe('When POST /login', () => {
      test('It returns status 200', async () => {
        const response = await request(app).post('/login').send({
          email: 'german@test.es',
          password: '1234',
        });
        idUser = response.body.id;
        tokenUser = response.body.token;
        expect(response.status).toBe(200);
      });
    });
  });

  describe('Testing rest of USERS routes', () => {
    describe('When GET /users/:id ', () => {
      test('It returns status 200', async () => {
        const response = await request(app)
          .get(`/users/${idUser}`)
          .set('Authorization', 'bearer ' + tokenUser);
        expect(response.status).toBe(200);
      });
    });
  });

  describe('When PATCH /users/:id ', () => {
    test('It returns status 200', async () => {
      const response = await request(app)
        .patch(`/users/${idUser}`)
        .send({ name: 'German el bueno' })
        .set('Authorization', 'bearer ' + tokenUser);
      expect(response.status).toBe(200);
    });
  });

  describe('When PATCH /users/:id with NO authorized', () => {
    test('It returns status 401', async () => {
      const response = await request(app)
        .patch(`/users/${idUser}`)
        .send({ name: 'German el bueno' })
        .set('Authorization', 'bearer ' + '1');
      expect(response.status).toBe(401);
    });
  });
});
