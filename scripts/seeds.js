require('../src/configs/db');
require('dotenv').config();

const { createUsers } = require('./users');
const { createIngredients } = require('./ingredients')

const usersDummy = require('./seeds/usersDummy.json');
const ingredientsDummy = require('./seeds/ingredientsDummy.json');




(async () => {
  try {
    await createUsers(usersDummy);
    await createIngredients(ingredientsDummy)
    console.info(ingredientsDummy)

  } catch (error) {
    console.error(error);
  }
})();