const mongoose = require("mongoose")

const planSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  mealsPerDay: {
    type: Number,
    required: true
  },

  duration: {
    type: Number, // days (7 or 30)
    required: true
  }

}, { timestamps: true })

module.exports = mongoose.model("SubscriptionPlan", planSchema)