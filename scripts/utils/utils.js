const dummyImages = require('../seeds/imagesDummy.json');

const selectRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const randomPic = dummyImages[Math.floor(Math.random() * dummyImages.length)];

let mealTypes = ['breakfast-snack', 'main', 'main', 'main', 'main', 'main'];

const genders = ['male', 'female', 'notSpecified'];

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

const objectiveTypes = ['add-muscle', 'lose-weight', 'eat-healthier'];

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

const populateRecipes = (usersArr, recipesArr) => {
  usersArr.forEach((user) => {
    const randomQuantityRecipes = Math.floor(2 + Math.random() * 8);
    for (let i = 0; i < randomQuantityRecipes; i++) {
      user.recipesSaved.push(selectRandomElement(recipesArr));
    }
  });
  return usersArr;
};

// const basalMetabolicCaculus = async (gender, height, weight, age) => {
//   let tbm = 0
//     if (await gender==="male"){
//       tbm = (66.47 + (13.75 * await weight) + ((5.003* await height)-(6.755* await age)))
//     }else if (await gender==="female"){
//       tbm =( 655.1 + (9.563 * await weight) + (1.85 * await height) - (4.676 * await age))
//     }else{
//       tbm =( 300 + (9.563 * await weight) + (3.85 * await height) - (5.676 * await age))
//     } return tbm
// }


const basalMetabolicCaculus = (gender, height, weight, age) => {
  try {
    let tbm = 0;
    if (( gender) === 'male') {
      tbm =
        66.47 +
        13.75 * ( weight) +
        (5.003 * ( height) - 6.755 * ( age));
    } else if (( gender) === 'female') {
      tbm =
        655.1 +
        9.563 * ( weight) +
        1.85 * ( height) -
        4.676 * ( age);
    } else {
      tbm =
        300 +
        9.563 * ( weight) +
        3.85 * ( height) -
        5.676 * ( age);
    }
    return tbm;
  } catch (error) {
    console.error('data not retrieved');
  }
};

const tbmWithObjectives = 

module.exports = {
  mealTypes,
  intolerancesType,
  randomPic,
  selectRandomElement,
  populateIngredients,
  genders,
  basalMetabolicCaculus,
  objectiveTypes,
  populateRecipes,
};
