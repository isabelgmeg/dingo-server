const router = require('express').Router();
const omitBy = require('lodash/omitBy');

const UserModel = require('../models/Users');

const { isAuthenticated } = require('../middlewares/authentication');

router.put('/modify', [isAuthenticated], async (req, res, next) => {

  try {
    const user = await UserModel.findById(req.user);

    if (!user) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }

    const result = await UserModel.findByIdAndUpdate(req.user, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/profile', [isAuthenticated], async (req, res, next) => {
  try {
    const userId = req.user;

    const result = await UserModel.findById(userId, {
      password: 0,
      _id: 0,
    });

    if (!result) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

router.get('/savedRecipes', [isAuthenticated], async (req, res, next) => {
  try {
    const userId = req.user;

    const userRecipes = await UserModel.findById(userId, {
      recipesSaved: 1,
      _id: 0,
    }).populate({
      path: 'recipesSaved',
      model: 'Recipes'
    });

    const recipesSaved = userRecipes.get('recipesSaved')

    res.status(200).json({
      success: true,
      data: recipesSaved,
      count: recipesSaved.length
    });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

router.post(
  '/addRecipe/:recipeId', 
  [isAuthenticated],
  async (req, res, next) => {
    try {
      const userId = req.user;
      const { recipeId } = req.params;

      const userRecipes = await UserModel.findById(userId);

      const isRecipeRepeated = userRecipes.get('recipesSaved').find((savedRecipeId) => {
        return savedRecipeId.toString() === recipeId
      })

      if (isRecipeRepeated) {
        const error = new Error('recipe already in saved recipes');
        error.code = 403;
        throw error;
      }

      const result = await UserModel.findByIdAndUpdate(
        userId,
        { $push: { recipesSaved: recipeId } },
        { new: true }
      );

      res.status(200).json({
        success: true,
        count: result.recipesSaved.length,
        data: result,
      });
    } catch (error) {
      res.status(401).json({ success: false, data: error.message });
    }
  }
);

router.put(
  '/removeRecipe/:recipeId',
  [isAuthenticated],
  async (req, res, next) => {
    try {
      const { recipeId } = req.params;
      const userId = req.user;

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { recipesSaved: recipeId } },
        { new: true }
      );

      res.status(200).json({
        success: true,
        count: updatedUser.get('recipesSaved').length,
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
