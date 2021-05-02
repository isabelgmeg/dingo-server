const dummyImages = require('./seeds/imagesDummy');


const populateRecipes = (recipesArr, ingredientsArr) =>
  recipesArr.forEach((recipe) => {
    const randomQuantityIngredients = Math.floor(2 + Math.random() * 8);
    populateIngredients(ingredientsArr, randomQuantityIngredients, recipe);
  });

const populateIngredients = (ingredientsArr, randomQuantityEle, recipe) => {
  for (let i = 0; i < randomQuantityEle; i++) {
    const selectedIngredient = selectRandomElement(ingredientsArr);
    if (!recipe.ingredients.includes(selectedIngredient)) {
      recipe.ingredients.push(selectedIngredient);
    }
  }
};

const selectRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const randomPic = dummyImages[Math.floor(Math.random() * dummyImages.length)]

let mealTypes = ['breakfast-snack', 'main', 'main', 'main', 'main', 'main']


const intolerancesType = [
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