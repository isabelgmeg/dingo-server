const faker = require('faker');

const BiometricsModel = require('../src/models/Biometrics');

const UsersModel = require('../src/models/Users');

const {
  selectRandomElement,
  genders,
  basalMetabolicCaculus,
  intolerancesType,
  objectiveTypes,
} = require('./utils/utils');

const dropBiometrics = async () => {
    await BiometricsModel.deleteMany({});
    console.info('> Biometrics collection deleted👮🏻‍♂!');
  };
  

const createBiometrics = async () => {
  const users = await UsersModel.find({});

  usersData = [];

  for (user of users) {
    const id = user.get('_id');
    const weight = Math.floor(Math.random() * (90-55)) + 55

    const userBiometricData = {
      userId: id,
      gender: selectRandomElement(genders),
      weight,
      age: Math.floor(Math.random() * (70-16)) + 16,
      weightProgress: [
        {
          weight,
          dateWeight: faker.date.past(1),
        },
      ],
      height: Math.floor(Math.random() * (210 -150)) + 150,
      basalMetabolicRate: 0,
      intolerances: selectRandomElement(intolerancesType),
      objectiveTypes: selectRandomElement(objectiveTypes),
      elabTimePerDay: Math.floor(Math.random() * (240 - 10)) + 10,
      mealsPerDay: Math.floor(Math.random() * (4-2)) + 2,
    };

    usersData.push(userBiometricData);
  }
  const addMetabolicRate = (array) => {
    array.forEach((user) => {
      user.basalMetabolicRate = Math.round(basalMetabolicCaculus(
        user.gender,
        user.height,
        user.weight,
        user.age
      ));
    });
  };

  addMetabolicRate(usersData);
  
  dropBiometrics()
  BiometricsModel.insertMany(usersData)
  console.info('> Biometrics collection added! 👩‍⚕️');

};

module.exports = {
  dropBiometrics,
  createBiometrics
};
