const router = require('express').Router();

const RecipesModel = require('../models/Recipes');
const BiometricsModel = require('../models/Biometrics');

const { isAuthenticated } = require('../middlewares/authentication');
const { checkRecipeQuantityLimits } = require('../utils/utils');

router.get('/get', [isAuthenticated], async (req, res, next) => {
  try {
    const userId = req.user;
    const biometricData = await BiometricsModel.findOne({ userId: req.user });

    const dataForRecipe = {
      userBasalRate: biometricData.get('basalMetabolicRate'),
      userElabTime: biometricData.get('elabTimePerDay'),
      userMealsPerDay: biometricData.get('mealsPerDay'),
      userIntolerances: biometricData.get('intolerances'),
    };

    console.log(dataForRecipe);

    const resultMealQuantity = checkRecipeQuantityLimits(dataForRecipe);

    // const { mealQuantityLimit, snackQuantityLimit } = resultMealQuantity;

    // if (snackQuantityLimit === 0) {

    let maxCalsLimit =
      (dataForRecipe.userBasalRate / dataForRecipe.userMealsPerDay) * 1.1;
    let minCalsLimit =
      (dataForRecipe.userBasalRate / dataForRecipe.userMealsPerDay) * 0.9;
    let limitRecipes = dataForRecipe.userMealsPerDay;

    console.log(maxCalsLimit, minCalsLimit);

    const recipeParams = await RecipesModel.find(
      {
        //mealType: 'main',
        //intolerances: dataForRecipe.userIntolerances,
        calories: {
          $gte: minCalsLimit,
          $lte: maxCalsLimit,
        },
        //   elabTime: {
        //     $gte:
        //       (dataForRecipe.userElabTime / dataForRecipe.userMealsPerDay) *
        //       0.8,
        //     $lte:
        //       (dataForRecipe.userElabTime / dataForRecipe.userMealsPerDay) *
        //       1.2,
        //   },
      }
      //{ limit: limitRecipes }
    );
    console.log(recipeParams);

    res.status(200).json({ success: true, data: recipeParams });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

module.exports = router;
