const bcrypt = require('bcrypt');

const UsersModel = require('../src/models/Users');
const RecipesModel = require('../src/models/Recipes');

const { selectRandomElement, populateRecipes } = require('./utils/utils');

const dropUsers = async () => {
  await UsersModel.deleteMany({});

  console.info('> users collection deleted👮🏻‍♂️!');
};

const createUsers = async (data) => {
  const usersMapped = data.map((singleUser) => {
    const password = singleUser.password;

    const hash = bcrypt.hashSync(password, 10);

    const user = {
      ...singleUser,
      password: hash,
      recipesSaved: [],
    };
    return user;
  });
  const recipes = await RecipesModel.find({});

  recipesArray = [];

  for (recipe of recipes) {
    const id = recipe.get('_id');

    recipesArray.push(id);
  }

  populateRecipes(usersMapped, recipesArray);

  await dropUsers();
  await UsersModel.insertMany(usersMapped);
  console.info('> users collection added!👦🏼👩🏻‍🦰');
};

module.exports = {
  createUsers,
  dropUsers,
};
