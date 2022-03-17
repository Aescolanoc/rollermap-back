import * as controller from './rollerplace.controller.js';
import { RollerPlace } from '../models/rollerplace.model.js';
import { User } from '../models/user.model.js';

jest.mock('../models/rollerplace.model.js');
jest.mock('../models/user.model.js');
let mockRollerPlace;

describe('Given the Rollerplace controller', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = { params: {} };
    res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn();
    mockRollerPlace = {
      name: 'Paseo de coches - Retiro',
      desciption: 'Pista muy popular entre los rollers, rodeada de naturaleza',
      location: [-3.68307, 40.41317],
      type: 'pista',
      slalom: true,
      city: 'Madrid',
      image: 'https://i.imgur.com/dsz1dCN.png',
      level: 'baja',
      author: '622f68740b2fa7a2b155e403',
    };
  });

  describe('Given the Rollerplace controller', () => {
    describe('getAllRollerPlaces throw an error', () => {
      beforeEach(() => {
        RollerPlace.find.mockImplementation(() => {
          throw new Error('Get All Rollerplaces not possible');
        });
      });
      test('Then call next', async () => {
        await controller.getAllRollerPlaces(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('When getAllRollerPlaces is triggered', () => {
      beforeEach(() => {
        RollerPlace.find.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('Then call send', async () => {
        await controller.getAllRollerPlaces(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
  });

  describe('getMyRollerPlaces throw an error)', () => {
    beforeEach(() => {
      RollerPlace.find.mockImplementation(() => {
        throw new Error('Get My Rollerplaces not possible');
      });
    });
    test('Then call next', async () => {
      await controller.getMyRollerPlaces(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When getMyRollerPlaces is triggered', () => {
    beforeEach(() => {
      req.tokenPayload = { id: '623072ff18d99ceeceb2eb83' };
      RollerPlace.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue([]),
      });
    });
    test('Then call send', async () => {
      await controller.getMyRollerPlaces(req, res, next);
      expect(res.status).toHaveBeenCalled();
    });
  });

  describe('When insertRollerPlace functions is triggered', () => {
    test('Then rollerplace is created', async () => {
      req.tokenPayload = { id: '623072ff18d99ceeceb2eb83' };
      RollerPlace.create.mockResolvedValue(mockRollerPlace);
      User.findOneAndUpdate.mockResolvedValue({});
      await controller.insertRollerPlace(req, res, next);
      expect(res.status).toHaveBeenCalled();
    });
  });

  describe('When insertRollerPlace functions is rejected', () => {
    test('Then rollerplace is rejected', async () => {
      req = { body: { author: 'test' } };
      RollerPlace.create.mockResolvedValue(null);
      User.findOneAndUpdate.mockRejectedValue(null);
      await controller.insertRollerPlace(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When getRollerPlaceDetails is triggered', () => {
    test('Then call send', async () => {
      req = { params: { id: '623072ff18d99ceeceb2eb83' } };
      RollerPlace.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue([]),
      });
      await controller.getRollerPlaceDetails(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('getRollerPlaceDetails throw an error)', () => {
    beforeEach(() => {
      RollerPlace.findOne.mockImplementation(() => {
        throw new Error('Get Rollerplaces details is not possible');
      });
    });
    test('Then call next', async () => {
      await controller.getRollerPlaceDetails(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When updateRollerPlace functions is triggered', () => {
    test('Then rollerplace is updated', async () => {
      req = {
        params: { _id: '623072ff18d99ceeceb2eb83' },
        body: { name: 'Pista modificada' },
      };
      User.findOneAndUpdate.mockResolvedValue({});
      await controller.updateRollerPlace(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('updateRollerPlace throw an error)', () => {
    beforeEach(() => {
      RollerPlace.findByIdAndUpdate.mockImplementation(() => {
        throw new Error('Update Rollerplace is not possible');
      });
    });
    test('Then call next', async () => {
      await controller.updateRollerPlace(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When deleteRollerPlace functions is triggered', () => {
    test('Then rollerplace is deleted', async () => {
      req = {
        params: { _id: '623072ff18d99ceeceb2eb83' },
        tokenPayload: { id: '1' },
      };
      User.findByIdAndDelete.mockResolvedValue({});
      User.findByIdAndUpdate.mockResolvedValue({});
      User.updateMany.mockResolvedValue({});
      await controller.deleteRollerPlace(req, res, next);
      expect(res.status).toHaveBeenCalled();
    });
  });

  describe('deleteRollerPlace throw an error)', () => {
    beforeEach(() => {
      RollerPlace.findByIdAndDelete.mockImplementation(() => {
        throw new Error('Delete Rollerplace is not possible');
      });
    });
    test('Then call next', async () => {
      await controller.deleteRollerPlace(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When toggleFavorites functions is triggered', () => {
    test('Then added id on favorites', async () => {
      req = {
        tokenPayload: { id: '6230ac6352811acc96c1ac9a' },
        params: { id: '6230f969748b66926a34966c' },
      };

      User.findById.mockResolvedValue({
        favorites: ['6230f969748b66926a34966c'],
      });
      User.findByIdAndUpdate.mockResolvedValue({});

      await controller.toggleFavorites(req, res, next);
      expect(res.status).toHaveBeenCalled();
    });

    test('Then NOT added id on favorites', async () => {
      req = {
        tokenPayload: { id: '6230ac6352811acc96c1ac9a' },
        params: { id: '6230f969748b66926a34966c' },
      };

      User.findById.mockResolvedValue({
        favorites: ['6230f969748b66926a34966d'],
      });
      User.findByIdAndUpdate.mockResolvedValue({});

      await controller.toggleFavorites(req, res, next);
      expect(res.status).toHaveBeenCalled();
    });
  });

  describe('toggleFavorites throw an error)', () => {
    beforeEach(() => {
      RollerPlace.findByIdAndUpdate.mockImplementation(() => {
        throw new Error('Add to favorites is not possible');
      });
    });

    test('Then call next', async () => {
      await controller.toggleFavorites(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
