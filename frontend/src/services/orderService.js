import API from "./api"

// Create Order (used in Checkout.jsx)
export const createOrder = async (orderData) => {
  const res = await API.post("/orders", orderData)
  return res.data
}

// Get Orders for Logged-in User (existing)
export const getMyOrders = async () => {
  const res = await API.get("/orders/myorders")
  return res.data
}

// NEW — Create Razorpay Order for Online Payment
export const createPaymentOrder = async (amount) => {
  const res = await API.post("/payments/create-order", { amount })
  return res.data
}

// NEW — Verify Payment Signature from Razorpay
export const verifyPayment = async (paymentData) => {
  const res = await API.post("/payments/verify", paymentData)
  return res.data
}