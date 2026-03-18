const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/db")

const mealRoutes = require("./routes/mealRoutes")//phase1
const authRoutes = require("./routes/authRoutes")//phase 2 
const orderRoutes = require("./routes/orderRoutes")//phase 3
const subscriptionRoutes = require("./routes/subscriptionRoutes") //phase 4 
const paymentRoutes = require("./routes/paymentRoutes")//phase 5
const adminRoutes = require("./routes/adminRoutes")//phase 6

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// connect database
connectDB()

// test route
app.get("/", (req, res) => {
res.send("Homely Meals API Running")
})

// routes
app.use("/api/meals", mealRoutes)//phase 1
app.use("/api/auth", authRoutes)//phase 2
app.use("/api/orders", orderRoutes)//phase 3
app.use("/api/subscriptions", subscriptionRoutes)//phase 4
app.use("/api/payments", paymentRoutes)//phase 5
app.use("/api/admin",adminRoutes)//phase 6


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})