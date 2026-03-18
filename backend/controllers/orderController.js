const Order = require("../models/Order")
const Meal = require("../models/Meal")

// Create Order
exports.createOrder = async (req,res)=>{

try{

const {items,deliveryAddress,paymentMethod} = req.body

if(!items || items.length === 0){
return res.status(400).json({message:"Cart is empty"})
}

// take first cart item (current model supports single meal)
const firstItem = items[0]

const meal = await Meal.findById(firstItem.meal)

if(!meal){
return res.status(404).json({message:"Meal not found"})
}

const quantity = firstItem.quantity

const totalPrice = meal.price * quantity

// create order
const order = await Order.create({

user:req.user._id,
meal:firstItem.meal,
quantity,
totalPrice,
deliveryAddress,
paymentMethod

})

res.status(201).json(order)

}catch(error){

console.error(error)
res.status(500).json({message:"Server error"})

}

}


// Get My Orders
exports.getMyOrders = async (req,res)=>{

try{

const orders = await Order.find({user:req.user._id})
.populate("meal")

res.json(orders)

}catch(error){

console.error(error)
res.status(500).json({message:"Server error"})

}

}


// Get Order By ID
exports.getOrderById = async (req,res)=>{

try{

const order = await Order.findById(req.params.id)
.populate("meal")
.populate("user","name email")

if(!order){
return res.status(404).json({message:"Order not found"})
}

res.json(order)

}catch(error){

console.error(error)
res.status(500).json({message:"Server error"})

}

}