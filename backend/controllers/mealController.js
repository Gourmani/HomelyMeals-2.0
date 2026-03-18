const Meal = require("../models/Meal")

// GET all meals
exports.getMeals = async (req,res) => {

try {

const meals = await Meal.find()

res.json(meals)

} catch(error){

res.status(500).json({message:"Server Error"})

}

}


// CREATE new meal
exports.createMeal = async (req,res) => {

try {

const meal = new Meal(req.body)

await meal.save()

res.status(201).json({
message:"Meal created successfully",
meal
})

} catch(error){

res.status(500).json({message:"Error creating meal"})

}

}

// get single meal
exports.getMealById = async (req,res) => {

try {

const meal = await Meal.findById(req.params.id)

if(!meal){
return res.status(404).json({message:"Meal not found"})
}

res.json(meal)

} catch(error){
res.status(500).json({message:"Server error"})
}

}


// update meal
exports.updateMeal = async (req,res) => {

try {

const meal = await Meal.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(meal)

} catch(error){
res.status(500).json({message:"Update failed"})
}

}


// delete meal
exports.deleteMeal = async (req,res) => {

try {

await Meal.findByIdAndDelete(req.params.id)

res.json({message:"Meal deleted"})

} catch(error){
res.status(500).json({message:"Delete failed"})
}

}