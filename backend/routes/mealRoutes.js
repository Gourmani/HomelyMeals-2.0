
const express = require("express")

const router = express.Router()

const {
getMeals,
createMeal,
getMealById,
updateMeal,
deleteMeal
} = require("../controllers/mealController")


router.get("/",getMeals)

router.post("/",createMeal)

router.get("/:id",getMealById)

router.put("/:id",updateMeal)

router.delete("/:id",deleteMeal)

module.exports = router