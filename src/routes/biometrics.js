const router = require('express').Router();

const BiometricsModel = require('../models/Biometrics');

const { isAuthenticated } = require('../middlewares/authentication');
const { basalMetabolicCaculus, bmrWithObjectives } = require('../utils/utils');

router.get('/get', [isAuthenticated], async (req, res, next) => {
  try {

    const biometricData = await BiometricsModel.findOne({ userId: req.user });

    //create biometric Data!
    if (!biometricData) {
      const error = new Error('Biometrics data not found');
      error.code = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: biometricData });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

router.post('/addBiometrics', [isAuthenticated], async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { userObjective } = req.body.objectives;
    const biometricData = await BiometricsModel.findOne({ userId: req.user },{
        userId: 1,
    });

    if (!biometricData) {
      const newBiometricData = new BiometricsModel({
        userId: req.user,
        gender: req.body.gender,
        age: req.body.age,
        weight: req.body.weight,
        weightProgress: [
          {
            weight: req.body.weight,
            dateWeight: new Date(),
          },
        ],
        height: req.body.height,
        basalMetabolicRate: 0,
        objectives: userObjective,
        intolerances: req.body.intolerances,
        elabTimePerDay: req.body.elabTimePerDay,
        mealsPerDay: req.body.mealsPerDay,
      });

      brmWithoutObjectives = Math.round(
        basalMetabolicCaculus(
          newBiometricData.gender,
          newBiometricData.height,
          newBiometricData.weight,
          newBiometricData.age
        )
      );

      newBiometricData.basalMetabolicRate = bmrWithObjectives(
        brmWithoutObjectives,
        userObjective
      );

      console.log("brmWithoutObjectives",brmWithoutObjectives)
      console.log("basalMetabolicRate",newBiometricData.basalMetabolicRate)
      const result = await BiometricsModel.create(newBiometricData);
      res.status(200).json({ success: true, data: result });
    }
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

router.put('/modifyWeight', [isAuthenticated], async (req, res, next) => {
  try {
    const newWeight = req.body.weight;

    const newWeightProgress = {
      weight: newWeight,
      dateWeight: new Date(),
    };

    const biometricData = await BiometricsModel.findOne({ userId: req.user });


    const userGender = biometricData.get('gender');
    const userHeight = biometricData.get('height');
    const userAge = biometricData.get('age');
    const userObjective = biometricData.get('objectives');

    const brmWithoutObjectives = Math.round(
      basalMetabolicCaculus(userGender, userHeight, newWeight, userAge)
    );

    const brmWithObjectivesResult = await bmrWithObjectives(
      brmWithoutObjectives,
      userObjective
    );

    const result = await BiometricsModel.findOneAndUpdate(
      { userId: req.user },
      {
        $push: { weightProgress: newWeightProgress},
        weight: newWeight,
        basalMetabolicRate: brmWithObjectivesResult ,
      },
      { new: true }
    );

    console.log(result)

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

router.put('/modifyObjectives', [isAuthenticated], async (req, res, next) => {
  try {
    const newObjective = req.body.objectives;

    const biometricData = await BiometricsModel.findOne({ userId: req.user });

    const userGender = biometricData.get('gender');
    const userHeight = biometricData.get('height');
    const userAge = biometricData.get('age');
    const userWeight = biometricData.get('weight');

    const brmWithoutObjectives = Math.round(
      basalMetabolicCaculus(userGender, userHeight, userWeight, userAge)
    );

    const brmWithObjectivesResult = await bmrWithObjectives(
      brmWithoutObjectives,
      newObjective
    );

    const result = await BiometricsModel.findOneAndUpdate(
      { userId: req.user },
      {
        objectives: newObjective ,
        basalMetabolicRate: brmWithObjectivesResult,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

module.exports = router;
