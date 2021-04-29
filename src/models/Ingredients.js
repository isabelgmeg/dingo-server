const mongoose = require("mongoose");
const { Schema } = mongoose;

// const ingredient = {
//     "name": "pepe",
//     "carbsPer100grams": 100,
//     "fatPer100grams": 200,
//     "proteinesPer100grams": 200,
//     "calServingPer100grams": 100,
//     "intolerances": ["lactose-intolerant"],
//     "picture":'www.google.com',
// }

const IngredientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    carbsPer100grams: {
      type: Number,
      required: true,
    },
    fatPer100grams: {
      type: Number,
      required: true,
    },
    proteinesPer100grams: {
      type: Number,
      required: true,
    },
    calsPer100grams: {
      type: Number,
      required: true,
    },
    intolerances: [
      {
        type: String,
        enum: [
          "lactose-intolerant",
          "gluten-intolerant",
          "nut-alergy",
          "fructose",
        ],
      },
    ],
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Ingredients", IngredientsSchema);

module.exports = model;
