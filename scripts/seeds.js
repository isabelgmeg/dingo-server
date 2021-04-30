require('../src/configs/db');
require('dotenv').config();

const { createUsers } = require('./users');

const usersDummy = require('./seeds/usersDummy.json');



(async () => {
  try {
    await createUsers(usersDummy);

  } catch (error) {
    console.error(error);
  }
})();