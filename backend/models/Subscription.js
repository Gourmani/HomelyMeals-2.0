const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  planName: {
    type: String,
    enum: ["Weekly", "Monthly"],
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  mealsPerDay: {
    type: Number,
    default: 1
  },

  startDate: {
    type: Date,
    default: Date.now
  },

  endDate: {
    type: Date
  },

  status: {
    type: String,
    enum: ["Active", "Cancelled", "Expired"],
    default: "Active"
  }

}, { timestamps: true });

module.exports = mongoose.model("Subscription", subscriptionSchema);