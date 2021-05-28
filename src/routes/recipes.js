const router = require('express').Router();

const mongoose = require('mongoose');

const RecipesModel = require('../models/Recipes');
const BiometricsModel = require('../models/Biometrics');
const IngredientsModel = require('../models/Ingredients')

const { isAuthenticated } = require('../middlewares/authentication');
const { checkRecipeQuantityLimits } = require('../utils/utils');

router.get('/getMealPlan', [isAuthenticated], async (req, res, next) => {
  try {
    const userId = req.user;
    const biometricData = await BiometricsModel.findOne({ userId: req.user });

      const userBasalRate = biometricData.get('basalMetabolicRate');
      const userElabTime =  biometricData.get('elabTimePerDay');
      const userMealsPerDay = biometricData.get('mealsPerDay');
      const userIntolerances = biometricData.get('intolerances');

     let maxCalsLimit = Number((userBasalRate / userMealsPerDay) * 1.2);
     let minCalsLimit = Number((userBasalRate / userMealsPerDay) * 0.75);
     let maxElabTime = Number((userElabTime/userMealsPerDay)*1.25)

     const rnd = Math.floor(Math.random() * (4 - 1 + 1) + 1)

      const recipeParams = await RecipesModel.find(
        {
          mealType: 'main',
          intolerances: userIntolerances,
          calories: {
            $gte: minCalsLimit,
            $lte: maxCalsLimit,
          },
          elabTime: {
            $lte: Number(maxElabTime)
          },
        },
      ).skip(rnd).limit(userMealsPerDay).populate({
        path: 'ingredientsInfo.ingredientId',
        model: 'Ingredients'
      });

    res.status(200).json({ success: true, data: recipeParams, count: recipeParams.length });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

router.get('/getRecipeByIngredients/:ingredientId', [isAuthenticated], async (req, res, next) => {
  try {
    const ingredientId = req.params.ingredientId

    console.log(ingredientId)

    const ingredientData = await RecipesModel.find({
      "ingredientsInfo.ingredientId": mongoose.Types.ObjectId(ingredientId) 
    });

    res.status(200).json({ success: true, data: ingredientData });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

router.get('/get/:recipeName', [isAuthenticated], async (req, res, next) => {
  try {
    const { recipeName } = req.params.recipeName

    const recipe = await RecipesModel.findOne({
      name: req.params.recipeName
    });

    console.log(recipeName)

    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

router.get('/getRecipeById/:recipeId', [isAuthenticated], async (req, res, next) => {
  try {
    const { recipeId } = req.params.recipeId

    const recipe = await RecipesModel.findById({ _id: req.params.recipeId }).populate({
      path: 'ingredientsInfo.ingredientId',
      model: 'Ingredients'
    });

    console.log(recipeId)
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

module.exports = router;
