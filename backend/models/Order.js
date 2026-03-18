const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

meal:{
type:mongoose.Schema.Types.ObjectId,
ref:"Meal",
required:true
},

quantity:{
type:Number,
default:1
},

totalPrice:{
type:Number,
required:true
},

// order status stages
status:{
type:String,
enum:[
"Pending",
"Confirmed",
"Preparing",
"Out for Delivery",
"Delivered",
"Cancelled"
],
default:"Pending"
},

// delivery address
deliveryAddress:{
street:{
type:String
},
city:{
type:String
},
pincode:{
type:String
}
},

// payment information
paymentMethod:{
type:String,
default:"COD"
},

isPaid:{
type:Boolean,
default:false
},

paidAt:{
type:Date
}

},{
timestamps:true
})

module.exports = mongoose.model("Order",orderSchema)