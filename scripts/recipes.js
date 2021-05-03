const RecipesModel = require('../src/models/Recipes');
const IngredientsModel = require('../src/models/Ingredients');

const dummyImages = require('./seeds/imagesDummy.json');
const dummyRecipes = require('./seeds/recipesDummy.json');

const randomPic = dummyImages[Math.floor(Math.random() * dummyImages.length)];

const selectRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

let intolerancesType = [
  'lactose-intolerant',
  'gluten-intolerant',
  'nut-alergy',
  'fructose',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
];

let mealTypes = ['breakfast-snack', 'main', 'main', 'main', 'main'];

const populateIngredients = (recipesArr, ingredientsArr) => {
  recipesArr.forEach((recipe) => {
    const randomQuantityIngredients = Math.floor(2 + Math.random() * 8);
    for (let i = 0; i < randomQuantityIngredients; i++) {
      recipe.ingredientsInfo.push({
        ingredientId: selectRandomElement(ingredientsArr),
        gramsPerIngredient: Math.floor(Math.random() * 300) + 15,
      });
    }
  });
  return recipesArr;
};

const dropRecipes = async () => {
  await RecipesModel.deleteMany({});

  console.info('> recipes collection deleted👮🏻‍♂!');
};

const createRecipes = async () => {
  //popular modelo ingredientsquantity:

  //array de ingredientes
  const ingredients = await IngredientsModel.find({});

  ingredientsArray = [];

  for (ingredient of ingredients) {
    const id = ingredient.get('_id');

    ingredientsArray.push(id);
  }

  //array de recetas

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
