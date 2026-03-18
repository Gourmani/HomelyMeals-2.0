const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")
const admin = require("../middleware/adminMiddleware")

const {
  createSubscription,
  getMySubscriptions,
  createPlan,
  getPlans,
  deletePlan
} = require("../controllers/subscriptionController")

router.post("/", protect, createSubscription)
router.get("/my", protect, getMySubscriptions)

router.post("/plans", protect, admin, createPlan)
router.get("/plans", getPlans)
router.delete("/plans/:id", protect, admin, deletePlan)

module.exports = router