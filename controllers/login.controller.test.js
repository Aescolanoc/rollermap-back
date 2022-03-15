import * as controller from './login.controller.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../services/auth.js';
import { User } from '../models/user.model.js';

jest.mock('../models/user.model.js');
jest.mock('bcryptjs');
jest.mock('../services/auth.js');

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
  });

  describe('When login is triggered', () => {
    describe('And there are not user email ', () => {
      test('Then call next', async () => {
        req.body = { email: 'pepe@pepe.es' };
        await controller.login(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
    describe('And there are not password', () => {
      test('Then call next ', async () => {
        req.body = { password: '1234' };
        await controller.login(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });

    describe('And there are user email or password', () => {
      beforeEach(() => {
        req.body = { email: 'pepe@pepe.es', password: '12345' };
      });

      describe('And the user email is not found', () => {
        test('Then call next', async () => {
          await User.findOne.mockResolvedValue(null);
          await controller.login(req, res, next);
          expect(next).toHaveBeenCalled();
        });
      });

      describe('And the password is no correct', () => {
        test('Then call next', async () => {
          await User.findOne.mockResolvedValue({});
          bcrypt.compareSync.mockReturnValue(null);
          await controller.login(req, res, next);
          expect(next).toHaveBeenCalled();
        });
      });

      describe('And the user email and password are ok', () => {
        test('Then call send', async () => {
          const user = {
            email: 'pepe@pepe.es',
            id: '1',
          };
          await User.findOne.mockResolvedValue(user);
          bcrypt.compareSync.mockReturnValue(true);
          createToken.mockReturnValue('mock_token');
          await controller.login(req, res, next);
          expect(res.json).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
