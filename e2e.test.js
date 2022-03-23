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
  let rollerplaceId;

  describe('Testing USERS to create an user', () => {
    describe('When POST /users to create an user', () => {
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
    describe('When POST /login to login as user', () => {
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
    describe('When GET /users/:id to get details of user profile', () => {
      test('It returns status 200', async () => {
        const response = await request(app)
          .get(`/users/${idUser}`)
          .set('Authorization', 'bearer ' + tokenUser);
        expect(response.status).toBe(200);
      });
    });
  });

  describe('When PATCH /users/:id to edit user profile', () => {
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

  describe('Testing rest of ROLLERPLACES routes', () => {
    describe('When GET /rollerplaces to show all rollerplace ', () => {
      test('It returns status 200', async () => {
        const response = await request(app)
          .get('/rollerplaces')
          .set('Authorization', 'bearer ' + tokenUser);
        expect(response.status).toBe(200);
      });
    });
    describe('When POST /rollerplaces/', () => {
      test('It returns status 201 to create a new rollerplace', async () => {
        const response = await request(app)
          .post('/rollerplaces')
          .send({
            name: 'Paseo de coches - Retiro',
            description:
              'Pista muy popular entre los rollers, rodeada de naturaleza',
            location: [-3.68307, 40.41317],
            type: 'pista',
            slalom: true,
            city: 'Madrid',
            image: 'https://i.imgur.com/dsz1dCN.png',
            level: 'baja',
            author: `${idUser}`,
          })
          .set('Authorization', 'bearer ' + tokenUser);
        rollerplaceId = response.body._id;
        expect(response.status).toBe(201);
      });
    });
    describe('When GET /rollerplaces/myrollerplaces to show rollerplaces of the user ', () => {
      test('It returns status 200', async () => {
        const response = await request(app)
          .get('/rollerplaces/myrollerplaces')
          .set('Authorization', 'bearer ' + tokenUser);
        expect(response.status).toBe(200);
      });
    });
    describe('When GET /rollerplaces/:id to show details of rollerplace', () => {
      test('It returns status 200', async () => {
        const response = await request(app)
          .get(`/rollerplaces/${rollerplaceId}`)
          .set('Authorization', 'bearer ' + tokenUser);
        expect(response.status).toBe(200);
      });
    });
    describe('When PATCH /rollerplaces/:id to toggle favorites ', () => {
      test('It returns status 200', async () => {
        const response = await request(app)
          .patch(`/rollerplaces/${rollerplaceId}`)
          .set('Authorization', 'bearer ' + tokenUser);
        expect(response.status).toBe(200);
      });
    });
    describe('When PUT /rollerplaces/:id to Edit rollerplace', () => {
      test('It returns status 200', async () => {
        const response = await request(app)
          .put(`/rollerplaces/${rollerplaceId}`)
          .send({
            name: 'Paseo de coches - Retiro MODIFICADA',
            description:
              'Pista muy popular entre los rollers, rodeada de naturaleza',
            location: [-3.68307, 40.41317],
            type: 'pista',
            slalom: true,
            city: 'Madrid',
            image: 'https://i.imgur.com/dsz1dCN.png',
            level: 'baja',
            author: `${idUser}`,
          })
          .set('Authorization', 'bearer ' + tokenUser);
        expect(response.status).toBe(200);
      });
    });
    describe('When DELETE /rollerplaces/:id to delete rollerplace', () => {
      test('It returns status 204', async () => {
        const response = await request(app)
          .delete(`/rollerplaces/${rollerplaceId}`)
          .set('Authorization', 'bearer ' + tokenUser);
        expect(response.status).toBe(204);
      });
    });
  });
});
