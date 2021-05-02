const RecipesModel = require('../src/models/Recipes');
const IngredientsModel = require('../src/models/Ingredients');

const dummyImages = require('./seeds/imagesDummy');
const dummyRecipes = require('./seeds/recipesDummy.json');

const selectRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const populateRecipes = (recipesArr, ingredientsArr) =>
  recipesArr.forEach((recipeToPopulate) => {
    const randomQuantityIngredients = Math.floor(2 + Math.random() * 8);
    populateIngredients(ingredientsArr, randomQuantityIngredients, recipeToPopulate);
  });

const populateIngredients = (ingredientsArr, randomQuantityEle, recipeToPopulate) => {
  for (let i = 0; i < randomQuantityEle; i++) {
    const selectedIngredient = selectRandomElement(ingredientsArr);
    console.info("recipeToPopulate.ingredients => ",recipeToPopulate.ingredients.ingredientsInfo)

    if (!recipeToPopulate.ingredients.ingredientsInfo.ingredient.includes(selectedIngredient)) {
       recipeToPopulate.ingredients.ingredientsInfo.push(selectedIngredient);
    }

  }
};

const randomGrams = Math.floor(Math.random() * 300) + 15

const randomPic = dummyImages[Math.floor(Math.random() * dummyImages.length)]


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

let mealTypes = ['breakfast-snack', 'main', 'main', 'main', 'main', ]

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
    ingredients: [{
        ingredientsInfo: { 
            ingredient,
            gramsPerIngredient:randomGrams
        }}
    ],
    mealType: selectRandomElement(mealTypes),
    intolerances: [selectRandomElement(intolerancesType)],
    picture: randomPic,
    createdBy: 'dingo',
  }));

  populateRecipes(newRecipes, ingredientsArray);

  //console.info(newRecipes);
  //return newRecipes;

  await RecipesModel.insertMany(newRecipes);
  console.info('> Recipes collection added!🍳');
};

module.exports = {
  createRecipes,
};
