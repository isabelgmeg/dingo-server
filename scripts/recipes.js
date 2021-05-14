const RecipesModel = require('../src/models/Recipes');
const IngredientsModel = require('../src/models/Ingredients');

const dummyRecipes = require('./seeds/recipesDummy.json');

const {
  mealTypes,
  intolerancesType,
  randomPic,
  selectRandomElement,
  populateIngredients,
} = require('./utils/utils');

const dropRecipes = async () => {
  await RecipesModel.deleteMany({});

  console.info('> recipes collection deleted👮🏻‍♂!');
};

const createRecipes = async () => {
  const ingredients = await IngredientsModel.find({});

  ingredientsArray = [];

  for (ingredient of ingredients) {

    ingredientsArray.push(ingredient._id);
  }

  console.log(ingredientsArray)

  const newRecipes = dummyRecipes.map((recipe) => ({
    ...recipe,
    ingredientsInfo: [],
    mealType: selectRandomElement(mealTypes),
    intolerances: [selectRandomElement(intolerancesType)],
    picture: randomPic,
    createdBy: '_' + Math.random().toString(36).substr(2, 9),
  }));

  const newRecipesWithIngredients = populateIngredients(
    newRecipes,
    ingredientsArray
  );

   await dropRecipes();
   await RecipesModel.insertMany(newRecipesWithIngredients);
  console.info('> Recipes collection added!🍳');
};

module.exports = {
  createRecipes,
  dropRecipes,
};
