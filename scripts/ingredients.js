
const IngredientsModel = require('../src/models/Ingredients');
const dummyImages = require('./seeds/imagesDummy')
const dummyIngredientImages = require('./seeds/ingredientsImagesDummy.json')

const dropIngredients = async () => {
  await IngredientsModel.deleteMany({});

  console.info('> ingredients collection deleted๐ฎ๐ปโโ๐ฅ๐!');
};

const createIngredients = async (data) => {

  const ingredientsMapped = data.map((singleIngredient) => {
    const intolerances = ['lactose-intolerant','gluten-intolerant','nut-alergy','fructose','none', 'none','none','none','none']
    const randomIntolerance = intolerances[Math.floor(Math.random() * intolerances.length)]
    const randomPic = dummyIngredientImages[Math.floor(Math.random() * dummyIngredientImages.length)]

    
    const ingredient = {
      ...singleIngredient,
      picture: randomPic,
      intolerances: [randomIntolerance],
    };
    return ingredient;
  });

  await dropIngredients();
  await IngredientsModel.insertMany(ingredientsMapped);
  console.info('> ingredients collection added!๐ณ๐ฅ๐ฝ');
};

module.exports = {
  createIngredients,
  dropIngredients,
};
