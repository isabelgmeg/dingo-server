require('../src/configs/db');
require('dotenv').config();

const { createUsers } = require('./users');
const { createIngredients } = require('./ingredients')
const { createRecipes } = require('./recipes')
const { createBiometrics } = require('./biometrics')

const usersDummy = require('./seeds/usersDummy.json');
const ingredientsDummy = require('./seeds/ingredientsDummy.json');


(async () => {
  try {
    await createUsers(usersDummy);
    await createIngredients(ingredientsDummy)
    await createRecipes()
    await createBiometrics()
  } catch (error) {
    console.error(error);
  }
})();