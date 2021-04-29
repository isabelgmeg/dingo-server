const mongoose = require("mongoose");
const { Schema } = mongoose;

// const user = {
//   "name": "pepe",
//   "surname": "pepito",
//   "email": "pepito@gmail.com",
//   "password": "asdjhsakd",
//   "active"; true
//   "recipesSaved": [ID FROM RECIPES],
// }

const UserSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "Name required"]
    },
    surname: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email required"],
    },
    password: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
    },
    recipesSaved: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Recipes'
      }
    ]
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Users", UserSchema);

module.exports = model;
