const Order = require("../models/Order")
const Meal = require("../models/Meal")
const User = require("../models/User")

// Get all orders
exports.getAllOrders = async (req,res)=>{

try{

const orders = await Order.find()
.populate("user","name email")
.populate("meal","name price")

res.json(orders)

}catch(error){

res.status(500).json({message:error.message})

}

}

// Delete meal
exports.deleteMeal = async (req,res)=>{

try{

const meal = await Meal.findById(req.params.id)

if(!meal){
return res.status(404).json({message:"Meal not found"})
}

await meal.deleteOne()

res.json({message:"Meal deleted successfully"})

}catch(error){

res.status(500).json({message:error.message})

}

}

// Get all users
exports.getAllUsers = async (req,res)=>{

try{

const users = await User.find().select("-password")

res.json(users)

}catch(error){

res.status(500).json({message:error.message})

}

}


exports.updateOrderStatus = async (req, res) => {

  try {

    const { status } = req.body

    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    order.status = status

    await order.save()

    res.json({ message: "Order status updated" })

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

exports.getDashboardStats = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments()
    const totalOrders = await Order.countDocuments()
    const totalMeals = await Meal.countDocuments()

    const totalRevenueData = await Order.find({ isPaid: true })

    const totalRevenue = totalRevenueData.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    )

    res.json({
      totalUsers,
      totalOrders,
      totalMeals,
      totalRevenue
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}