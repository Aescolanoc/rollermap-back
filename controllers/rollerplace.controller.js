import { RollerPlace } from '../models/rollerplace.model.js';

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
    const resp = await RollerPlace.find({ author: req.params.author });
    res.json(resp);
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
