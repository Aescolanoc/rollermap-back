import { RollerPlace } from '../models/rollerplace.model.js';
import { User } from '../models/user.model.js';

export const getAllRollerPlaces = async (req, res, next) => {
  try {
    const resp = await RollerPlace.find({});
    res.json(resp);
  } catch (error) {
    next(error);
  }
};

export const getMyRollerPlaces = async (req, res, next) => {
  try {
    const resp = await RollerPlace.find({ author: req.body.id });
    res.json(resp);
  } catch (error) {
    next(error);
  }
};

export const insertRollerPlace = async (req, res, next) => {
  try {
    const result = RollerPlace.create(req.body);

    await User.findOneAndUpdate(
      { _id: req.body.author },
      { $push: { myrollerplaces: result._id } }
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getRollerPlaceDetails = async (req, res, next) => {
  try {
    const resp = await RollerPlace.findOne({ _id: req.params.id });
    res.json(resp);
  } catch (error) {
    next(error);
  }
};

export const updateRollerPlace = async (req, res, next) => {
  try {
    const resp = await RollerPlace.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.json(resp);
  } catch (error) {
    next(error);
  }
};

export const deleteRollerPlace = async (req, res, next) => {
  try {
    const resp = await RollerPlace.findByIdAndDelete({ _id: req.params.id });
    res.json(resp);
  } catch (error) {
    next(error);
  }
};

export const addToFavorites = async (req, res, next) => {
  try {
    const resp = await User.findByIdAndUpdate(
      { _id: req.body.id },
      { $addToSet: { favorites: req.params.id } }
    );
    res.json(resp);
  } catch (error) {
    next(error);
  }
};
