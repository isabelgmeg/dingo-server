const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientQuantity = new Schema(
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

module.exports = ingredientQuantity;
