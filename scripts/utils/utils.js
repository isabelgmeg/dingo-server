const dummyImages = require('../seeds/imagesDummy.json');

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


module.exports = {
  mealTypes,
  intolerancesType,
  randomPic,
  selectRandomElement,
  populateIngredients
}