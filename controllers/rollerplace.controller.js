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

// export const updateRollerPlaceDetails = async (req, res, next) => {
//   try {
//     const resp = await RollerPlace.findByIdAndUpdate()
//   } catch (error) {
//     next(error);
//   }
// }
