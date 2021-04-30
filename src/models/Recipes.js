const mongoose = require('mongoose');
const { Schema } = mongoose;

// const recipe = {
//     "name": "pepe",
//      "ingredients": [{id: id from INGREDIENTS,
//                      gramsPerIngredient: Number}],
//      "mealType": 'main'
//      "gramsPerRecipe": 100
//      "elabTime":100 IN MINUTESSS
//     "carbs": 100,
//     "fat": 200,
//     "proteins": 200,
//     "calories": 100,
//     "intolerances": [
//      "lactose-intolerant",
//     "gluten-intolerant",
//    "nut-alergy",
//    "fructose",
// ]
//      "intolerances": [x,x],
//     "picture":'www.google.com',
//      "instructions": "bababababababa",
//      "createdBy": id from USERS
//
// }

const RecipesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mealType: [
      {
        type: String,
        required: true,
        enum: ['breakfast-snack', 'main'],
      },
    ],
    ingredients: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Ingredients',
      },
      {
        gramsPerIngredient: {
          type: Number,
          required: true,
        },
      },
    ],
    gramsPerRecipe: {
      type: Number,
      required: true,
    },
    elabTime: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
    proteins: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
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
        ],
      },
    ],
    picture: {
      type: String,
    },
    instructions: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Recipes', RecipesSchema);

module.exports = model;
