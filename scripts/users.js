require('../src/configs/db');

const bcrypt = require('bcrypt');


const usersDummy = require('./usersDummy.json');

const UsersModel = require('../src/models/Users');

const dropUsers = async () => {
    await UsersModel.deleteMany({});
  
    console.info('> users collection deleted!');
  };

const createUsers = async (usersDummy) => {

  const usersMapped = usersDummy.map((singleUser) => {

    const password = singleUser.password;

    const hash = bcrypt.hashSync(password, 10);

    const user = {
      ...singleUser,
      password: hash,
      recipesSaved: [],
    };
    return user;
  });

  await dropUsers()
  await UsersModel.insertMany(usersMapped);
  console.info(usersMapped)
  console.info('> users collection added!');
};

module.exports = {
  createUsers,
  dropUsers,
};
