require('dotenv').config();
require('../src/configs/db');

const { createUsers } = require('./users');
const { createIngredients } = require('./ingredients')
const { createRecipes } = require('./recipes')
const { createBiometrics } = require('./biometrics')

const usersDummy = require('./seeds/usersDummy.json');
const ingredientsDummy = require('./seeds/ingredientsDummy.json');


(async () => {
  try {
    await createIngredients(ingredientsDummy)
    await createRecipes()
    await createUsers(usersDummy);
    await createBiometrics()
  } catch (error) {
    console.error(error);
  }
})();