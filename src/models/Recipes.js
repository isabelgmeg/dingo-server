const mongoose = require('mongoose');

const { Schema } = mongoose;

// const recipe = {
//     "name": "pepe",
//      "ingredientsInfo": [
//          {
//      recipeId: {
//      type: mongoose.Schema.Types.ObjectId,
//      ref: 'Recipes',
//    },
//    ingredientId: {
//      type: mongoose.Schema.Types.ObjectId,
//      ref: 'Ingredients',
//   },
//    gramsPerIngredient: { type: Number },
//  }
//       ],
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

// ingredients: [
//   { 
//     ingredient: asjhdgadjhfagjh,
//     gramsPerIngredient: 1000
//   },
//   { 
//     ingredient: asjhdgadjhfagjh,
//     gramsPerIngredient: 1000
//   },
// ],

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
    ingredientsInfo: [{
      type: Object,
      ingredientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredients'
      },
      gramsPerIngredient: {
        type: Number,
        required: true,
      }
    }],
    totalIngredients:{
      type: Number
    },
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
          'none',
        ],
      },
    ],
    picture: {
      type: String,
    },
    instructions: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: String,
      unique: false
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Recipes', RecipesSchema);

module.exports = model;
