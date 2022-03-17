import { RollerPlace } from '../models/rollerplace.model.js';
import { User } from '../models/user.model.js';

export const getAllRollerPlaces = async (req, res, next) => {
  try {
    const resp = await RollerPlace.find({});
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

export const getMyRollerPlaces = async (req, res, next) => {
  try {
    const resp = await RollerPlace.find({ author: req.tokenPayload.id });
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

export const insertRollerPlace = async (req, res, next) => {
  try {
    const result = await RollerPlace.create(req.body);

    await User.findByIdAndUpdate(req.tokenPayload.id, {
      $push: { myrollerplaces: result._id },
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getRollerPlaceDetails = async (req, res, next) => {
  try {
    const resp = await RollerPlace.findOne({ _id: req.params.id });
    res.status(200).json(resp);
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
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

export const deleteRollerPlace = async (req, res, next) => {
  try {
    const resp = await RollerPlace.findByIdAndDelete({ _id: req.params.id });

    await User.findByIdAndUpdate(req.tokenPayload.id, {
      $pull: { myrollerplaces: req.params.id },
    });

    await User.updateMany(
      { favorites: { $in: [req.params.id] } },
      { $pull: { favorites: req.params.id } }
    );

    res.status(204).json(resp);
  } catch (error) {
    next(error);
  }
};

export const toggleFavorites = async (req, res, next) => {
  try {
    let foundUser = await User.findById({ _id: req.tokenPayload.id });
    const processedFavorites = foundUser.favorites.map((e) => e.toString());
    const isInFavorites = processedFavorites.some((e) => e === req.params.id);
    let updatedUser;

    if (isInFavorites) {
      updatedUser = await User.findByIdAndUpdate(
        req.tokenPayload.id,
        {
          $pull: { favorites: req.params.id },
        },
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        req.tokenPayload.id,
        {
          $addToSet: { favorites: req.params.id },
        },
        { new: true }
      );
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
