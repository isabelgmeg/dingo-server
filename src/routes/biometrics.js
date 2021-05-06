const router = require('express').Router();

const BiometricsModel = require('../models/Biometrics');

const { isAuthenticated } = require('../middlewares/authentication');
const { basalMetabolicCaculus } = require('../utils/utils');

router.get('/get', [isAuthenticated], async (req, res, next) => {
  try {
    const { userId } = req.user;
    const biometricData = await BiometricsModel.findOne({userId}, {
      userId: 0,
    });

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

router.put('/modify', [isAuthenticated], async (req, res, next) => {
  try {
    const { userId } = req.user;

    const userBiometricData = await BiometricsModel.findOne({userId}, {
      userId: 0,
    });

    const newBiometricData = {
        gender: req.body.gender,
        objectives: req.body.objectives,
        userId: req.user,
        weight: req.body.weight,
        age: req.body.age,
        height: req.body.height,
        elabTimePerDay: req.body.elabTimePerDay,
        mealsPerDay: req.body.mealsPerDay,
      };

      newBiometricData.basalMetabolicRate = Math.round(
        basalMetabolicCaculus(
            newBiometricData.gender,
            newBiometricData.height,
            newBiometricData.weight,
            newBiometricData.age
        )
      );

      console.info(newBiometricData);

      const result = await BiometricsModel.findOneAndUpdate({userId}, newBiometricData, {new: true});

      res.status(200).json({ success: true, data: result });

  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});


    // if (!userBiometricData) {
    //   await BiometricsModel.create(userId, {
    //     userId: userId,
    //     // gender: null,
    //     // age: null,
    //     // weight: null,
    //     // weightProgress: [],
    //     // height: null,
    //     // basalMetabolicRate: null,
    //     // objectives: [],
    //     // intolerances: [],
    //     // elabTimePerDay: null,
    //     // mealsPerDay: null,
    //   });
    // }

module.exports = router;
