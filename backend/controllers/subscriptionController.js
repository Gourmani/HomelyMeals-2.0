const Subscription = require("../models/Subscription")
const SubscriptionPlan = require("../models/SubscriptionPlan")

// USER: Create Subscription
exports.createSubscription = async (req, res) => {
  try {

    const { planName, price, mealsPerDay } = req.body

    let endDate = new Date()

    if (planName === "Weekly") {
      endDate.setDate(endDate.getDate() + 7)
    }

    if (planName === "Monthly") {
      endDate.setDate(endDate.getDate() + 30)
    }

    const subscription = new Subscription({
      user: req.user.id,
      planName,
      price,
      mealsPerDay,
      endDate
    })

    const savedSubscription = await subscription.save()

    res.status(201).json(savedSubscription)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// USER: Get My Subscriptions
exports.getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user.id
    })

    res.json(subscriptions)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ADMIN: Create Plan
exports.createPlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.create(req.body)
    res.json(plan)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// USER: Get Plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find()
    res.json(plans)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ADMIN: Delete Plan
exports.deletePlan = async (req, res) => {
  try {
    await SubscriptionPlan.findByIdAndDelete(req.params.id)
    res.json({ message: "Plan deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}