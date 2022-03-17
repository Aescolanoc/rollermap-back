import * as controller from './login.controller.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../services/auth.js';
import { User } from '../models/user.model.js';

jest.mock('../models/user.model.js');
jest.mock('bcryptjs');
jest.mock('../services/auth.js');
let mockUser;

describe('Given the login controller', () => {
  let req;
  let res;
  // eslint-disable-next-line no-unused-vars
  let next;
  beforeEach(() => {
    req = { params: {} };
    res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn();
    mockUser = {
      name: 'Pepe',
      email: 'pepe@pepe.es',
      password: '1234',
      favorites: [{}],
      myrollerplaces: [{}],
    };
  });

  describe('When login is triggered', () => {
    describe('And there are not email ', () => {
      test('Then call next', async () => {
        req.body = { email: mockUser.email };
        User.findOne.mockReturnValue({ populate: () => Promise.resolve(null) });
        await controller.login(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
    describe('And there are not password', () => {
      test('Then call next ', async () => {
        req.body = { password: mockUser.password };
        await controller.login(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });

    describe('And there are email or password', () => {
      beforeEach(() => {
        req.body = { email: mockUser.email, password: mockUser.password };
      });

      describe('And the user email is not found', () => {
        test('Then call next', async () => {
          User.findOne.mockReturnValue({
            populate: () => Promise.resolve(null),
          });
          await controller.login(req, res, next);
          expect(next).toHaveBeenCalled();
        });
      });

      describe('And the password is no correct', () => {
        test('Then call next', async () => {
          User.findOne.mockReturnValue({
            populate: () => Promise.resolve(null),
          });

          bcrypt.compareSync.mockReturnValue(null);
          await controller.login(req, res, next);
          expect(next).toHaveBeenCalled();
        });
      });

      describe('And the user email and password are ok', () => {
        test('Then call send', async () => {
          User.findOne.mockReturnValue({
            populate: () => Promise.resolve(mockUser),
          });

          bcrypt.compareSync.mockReturnValue(true);
          createToken.mockReturnValue('mock_token');
          await controller.login(req, res, next);
          expect(res.json).toHaveBeenCalledTimes(1);
        });
      });

      describe('And the user email and password are NOT OK', () => {
        test('Then call send', async () => {
          User.findOne.mockReturnValue({
            populate: () => Promise.resolve(mockUser),
          });

          bcrypt.compareSync.mockReturnValue(false);
          createToken.mockReturnValue('mock_token');
          await controller.login(req, res, next);
          expect(next).toHaveBeenCalled();
        });
      });
    });
  });
});
