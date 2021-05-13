const router = require('express').Router();

const RecipesModel = require('../models/Recipes');
const BiometricsModel = require('../models/Biometrics');

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

      console.log(userMealsPerDay)

    //const resultMealQuantity = checkRecipeQuantityLimits(dataForRecipe);

     let maxCalsLimit = Number((userBasalRate / userMealsPerDay) * 1.2);
     let minCalsLimit = Number((userBasalRate / userMealsPerDay) * 0.75);
     let limitRecipes = Number(userMealsPerDay);
     let maxElabTime = Number((userElabTime/userMealsPerDay)*1.25)

     console.log(maxElabTime)

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
      ).limit(userMealsPerDay);
    console.log(recipeParams);

    res.status(200).json({ success: true, data: recipeParams, count: recipeParams.length });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

module.exports = router;
