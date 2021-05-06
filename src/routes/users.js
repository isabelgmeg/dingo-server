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

    const filteredUser = omitBy(req.body, (value, _) => !value);

    const result = await UserModel.findByIdAndUpdate(req.user, filteredUser, {
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
    });

    const recipesSaved = userRecipes.get('recipesSaved');

    res.status(200).json({
      success: true,
      data: recipesSaved,
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

      const userRecipes = await UserModel.findById(userId, {
        recipesSaved: 1,
        _id: 0,
      });

      if (userRecipes.recipesSaved.includes(recipeId)) {
        const error = new Error('recipe already in saved recipes');
        error.code = 403;
        throw error;
      }

      userRecipes.recipesSaved.push(recipeId);
      userRecipes.save(next);

      res.status(200).json({
        success: true,
        count: userRecipes.length,
        data: { userRecipes },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/addRecipe/:recipeId',
  [isAuthenticated],
  async (req, res, next) => {
    try {
      const userId = req.user;
      const { recipeId } = req.params;

      const userRecipes = await UserModel.findById(userId, {
        recipesSaved: 1,
        _id: 0,
      });

      if (userRecipes.recipesSaved.includes(recipeId)) {
        const error = new Error('recipe already in saved recipes');
        error.code = 403;
        throw error;
      }

      userRecipes.recipesSaved.push(recipeId);
      userRecipes.save(next);

      res.status(200).json({
        success: true,
        count: userRecipes.length,
        data: { userRecipes },
      });
    } catch (error) {
      next(error);
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

      const userRecipes = await UserModel.findById(filteredUser, {
        _id: userId,
        recipesSaved: 1,
      })

      userRecipes.recipesSaved.pull(recipeId);
      userRecipes.save(next);

      res.status(200).json({
        success: true,
        count: userRecipes.length,
        data: { userRecipes },
      })

    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;
