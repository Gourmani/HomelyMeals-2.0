const express = require("express")

const router = express.Router()

const protect = require("../middleware/authMiddleware")
const admin = require("../middleware/adminMiddleware")
const { getDashboardStats } = require("../controllers/adminController")
const {
  getAllOrders,
  deleteMeal,
  getAllUsers,
  updateOrderStatus   // ADD THIS
} = require("../controllers/adminController")

router.get("/orders", protect, admin, getAllOrders)

router.delete("/meals/:id", protect, admin, deleteMeal)

router.get("/users", protect, admin, getAllUsers)

//  NEW ROUTE
router.put("/orders/:id", protect, admin, updateOrderStatus)

router.get("/dashboard", protect, admin, getDashboardStats)

module.exports = router