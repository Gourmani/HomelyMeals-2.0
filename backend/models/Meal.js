const mongoose = require("mongoose")

const mealSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  image: {
    type: String
  },

  available: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
})

module.exports = mongoose.model("Meal", mealSchema)