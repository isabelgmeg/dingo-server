const mongoose = require('mongoose');
const { Schema } = mongoose;

// const BIOMETRICS_MOCK = {
//   "gender": "male",
//   "age":30,
//   "weightProgress":[
//     {
//       "weight": 300,
//       "dateWeight": 13/02/23,
//     },
//     {
//       "weight": 200,
//       "dateWeight": 11/02/23,
//     }
//   ],
//    "basalMetabolicRate": 167,
//   "height": 167,
//   "objectives": ['add-muscle', 'lose-weight', 'eat-healthier'],
//   "intolerances": [
//     'lactose-intolerant',
//     'gluten-intolerant',
//     'nut-alergy',
//     'fructose',
//   ],
//   "elabTimePerDay":120,
//   "mealsPerDay": 3,
// }

const BiometricsSchema = new Schema(
  {
    userId:
      {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
      },
    gender: {
      type: String,
      enum: ['male', 'female', 'notSpecified'],
      default: 'notSpecified',
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 110,
    },
    weight: {
      type: Number,
      required: true,
    },
    weightProgress: [
      {
        weight: {
          type: Number,
          min: 20,
          max: 400,
        },
        dateWeight: {
          type: Date,
        },
      },
    ],
    height: {
      type: Number,
      required: true,
    },
    basalMetabolicRate: {
      type: Number,
      required: true,
    },
    objectives: {
      type: String,
      enum: ['add-muscle', 'lose-weight', 'eat-healthier'],
      default: 'eat-healthier',
      required: true,
    },
    intolerances: [
      {
        type: String,
        enum: [
          'lactose-intolerant',
          'gluten-intolerant',
          'nut-alergy',
          'fructose',
          'none',
        ],
      },
    ],
    elabTimePerDay: {
      type: Number,
      required: true,
    },
    mealsPerDay: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Biometrics', BiometricsSchema);

module.exports = model;
