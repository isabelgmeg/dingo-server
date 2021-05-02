require('../src/configs/db');
require('dotenv').config();

const { createUsers } = require('./users');
const { createIngredients } = require('./ingredients')
const { createRecipes } = require('./recipes')

const usersDummy = require('./seeds/usersDummy.json');
const ingredientsDummy = require('./seeds/ingredientsDummy.json');




(async () => {
  try {
    await createUsers(usersDummy);
    await createIngredients(ingredientsDummy)
    await createRecipes()
  } catch (error) {
    console.error(error);
  }
})();