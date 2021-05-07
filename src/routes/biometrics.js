const router = require('express').Router();

const BiometricsModel = require('../models/Biometrics');

const { isAuthenticated } = require('../middlewares/authentication');
const { basalMetabolicCaculus } = require('../utils/utils');

router.get('/get', [isAuthenticated], async (req, res, next) => {
  try {
    const userId = req.user;
    const biometricData = await BiometricsModel.findOne({ userId });

    console.log(userId);

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

// router.put('/modify', [isAuthenticated], async (req, res, next) => {
//   try {
//     const { userId } = req.user;
//     // const { newWeight } = req.body.weight;

//     const userBiometricData = await BiometricsModel.findOne(userId, {
//       userId: 0,
//     });

//     console.log(req.body.weight)

//     const previousWeight = userBiometricData.get('weight')
//     //  console.log( "previousWeight" ,previousWeight)
//     const previousWeightProgress = userBiometricData.get('weightProgress')

//     console.log(previousWeightProgress)

//     if (!userBiometricData) {
//       const error = new Error('Biometric data not found');
//       error.code = 404;
//       throw error;
//     }

//     const newBiometricData = {
//       userId: req.user,
//       gender: req.body.gender,
//       objectives: req.body.objectives,
//       age: req.body.age,
//       height: req.body.height,
//       elabTimePerDay: req.body.elabTimePerDay,
//       mealsPerDay: req.body.mealsPerDay,
//       weight: previousWeight,
//       weightprogress: [previousWeightProgress]
//     };

//     if (req.body.weight) {
//         const newWeightProgress = {
//           weight: req.body.weight,
//           dateWeight: new Date(),
//         };
//         newBiometricWeight = previousWeightProgress.push(newWeightProgress);
//         newBiometricData.weight = req.body.weight

//         newBiometricWeight.basalMetabolicRate = Math.round(
//           basalMetabolicCaculus(
//             newBiometricData.gender,
//             newBiometricData.height,
//             newBiometricData.weight,
//             newBiometricData.age
//           )
//         );

//         const resultWithWeight = await BiometricsModel.findOneAndUpdate(
//           userId,
//           newBiometricWeight,
//           { new: true }
//         );
//         console.log(resultWithWeight)

//         res.status(200).json({ success: true, data: resultWithWeight });
//     }

//     const resultWithoutWeight = await BiometricsModel.findOneAndUpdate(
//         userId,
//         newBiometricData,
//         { new: true }
//       );
//     //console.log(resultWithoutWeight);
//     res.status(200).json({ success: true, data: resultWithoutWeight });
//   } catch (error) {
//     res.status(401).json({ success: false, data: error.message });
//   }
// });

router.post('/addBiometrics', [isAuthenticated], async (req, res, next) => {
  try {
    const { userId } = req.user;
    const biometricData = await BiometricsModel.findOne({ userId });

    console.log(req.body.weight);

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
        objectives: req.body.objectives,
        intolerances: req.body.intolerances,
        elabTimePerDay: req.body.elabTimePerDay,
        mealsPerDay: req.body.mealsPerDay,
      });

      newBiometricData.basalMetabolicRate = Math.round(
        basalMetabolicCaculus(
          newBiometricData.gender,
          newBiometricData.height,
          newBiometricData.weight,
          newBiometricData.age
        )
      );
      console.log(newBiometricData);

      const result = await BiometricsModel.create(newBiometricData)
      res.status(200).json({ success: true, data: result });
    }
  } catch (error) {
    res.status(401).json({ success: false, data: error.message });
  }
});

module.exports = router;
