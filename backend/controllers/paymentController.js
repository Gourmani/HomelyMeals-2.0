const razorpay = require("../config/razorpay")

exports.createPaymentOrder = async (req, res) => {

try {

const { amount } = req.body

const options = {
amount: amount * 100,
currency: "INR",
receipt: "receipt_" + Date.now()
}

const order = await razorpay.orders.create(options)

res.json(order)

} catch (error) {

res.status(500).json({ message: error.message })

}

}
const crypto = require("crypto")

exports.verifyPayment = async (req, res) => {

try {

const {
razorpay_order_id,
razorpay_payment_id,
razorpay_signature
} = req.body

const body = razorpay_order_id + "|" + razorpay_payment_id

const expectedSignature = crypto
.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
.update(body.toString())
.digest("hex")

if (expectedSignature === razorpay_signature) {

return res.json({
message: "Payment verified successfully",
paymentId: razorpay_payment_id
})

} else {

return res.status(400).json({
message: "Invalid payment signature"
})

}

} catch (error) {

res.status(500).json({
message: error.message
})

}

}