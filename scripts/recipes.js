const RecipesModel = require('../src/models/Recipes');
const IngredientsModel = require('../src/models/Ingredients');

const dummyImages = require('./seeds/imagesDummy');
const dummyRecipes = require('./seeds/recipesDummy.json');

const selectRandomIngredient = (array) =>
  array[Math.floor(Math.random() * array.length)];

const populateRecipes = (recipesArr, ingredientsArr) =>
  recipesArr.forEach((recipe) => {
    const randomQuantityIngredients = Math.floor(2 + Math.random() * 8);
    populateIngredients(ingredientsArr, randomQuantityIngredients, recipe);
  });

const populateIngredients = (ingredientsArr, randomQuantityEle, recipe) => {
  for (let i = 0; i < randomQuantityEle; i++) {
    const selectedIngredient = selectRandomIngredient(ingredientsArr);
    if (!recipe.ingredients.includes(selectedIngredient)) {
      recipe.ingredients.push(selectedIngredient);
    }
  }
};

const createRecipes = async () => {
  const ingredients = await IngredientsModel.find({});

  ingredientsArray = [];

  for (ingredient of ingredients) {
    const id = ingredient.get('_id');

    ingredientsArray.push(id);
    //console.info(ingredientsArray);
  }
  const newRecipes = dummyRecipes.map((recipe) => ({
    ...recipe,
    ingredients: [],
    mealType: '',
    intolerances: [],
    picture: '',
    createdBy: 'dingo',
  }));

  //console.info('newRecipes', newRecipes);

  //return newRecipes;

  populateRecipes(newRecipes, ingredientsArray);

  console.info(newRecipes);
  return newRecipes;
};

module.exports = {
  createRecipes,
};
