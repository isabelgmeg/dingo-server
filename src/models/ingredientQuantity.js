const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredientQuantity = new Schema(
  [{
    ingredientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredients',
    },
    gramsPerIngredient: { type: Number },
  },
],{
  timestamps: true
}
);

module.exports = IngredientQuantity;
