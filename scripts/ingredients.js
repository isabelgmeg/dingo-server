
const IngredientsModel = require('../src/models/Ingredients');
const dummyImages = require('./seeds/imagesDummy')

const dropIngredients = async () => {
  await IngredientsModel.deleteMany({});

  console.info('> ingredients collection deleted👮🏻‍♂🥖🍞!');
};

const createIngredients = async (ingredientsDummy) => {

  const ingredientsMapped = ingredientsDummy.map((singleIngredient) => {
    const intolerances = ['lactose-intolerant','gluten-intolerant','nut-alergy','fructose','none', 'none','none','none','none','none']
    const randomIntolerance = intolerances[Math.floor(Math.random() * intolerances.length)]
    const randomPic = dummyImages[Math.floor(Math.random() * dummyImages.length)]

    
    const ingredient = {
      ...singleIngredient,
      picture: randomPic,
      intolerances: [randomIntolerance],
    };
    return ingredient;
  });

  await dropIngredients();
  await IngredientsModel.insertMany(ingredientsMapped);
  console.info('> ingredients collection added!🍳🥕🌽');
};

module.exports = {
  createIngredients,
  dropIngredients,
};
