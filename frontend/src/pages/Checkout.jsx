import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { createOrder, createPaymentOrder, verifyPayment } from "../services/orderService"

function Checkout() {

  const { cart, clearCart } = useContext(CartContext)
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState("COD") // for razorpay integration, default is COD (Cash on Delivery)
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  })

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleOrder = async () => {

    const { name, phone, street, city, state, pincode } = address

    if (!name || !phone || !street || !city || !state || !pincode) {
      alert("Please fill complete delivery address")
      return
    }

    try {

      const fullAddress =
        `${name}, ${phone}, ${street}, ${city}, ${state} - ${pincode}`

      const orderData = {
        items: cart.map(item => ({
          meal: item._id,
          quantity: item.quantity
        })),
        deliveryAddress: fullAddress,
        paymentMethod: paymentMethod // for razorpay integration, this will be "RAZORPAY" instead of "COD"
      }

      
      //  COD FLOW
if (paymentMethod === "COD") {

  await createOrder(orderData)

  alert("Order placed successfully!")
  clearCart()
  navigate("/order-success")
}


//  ONLINE FLOW
if (paymentMethod === "ONLINE") {

  // 1. Create Razorpay order
  const paymentOrder = await createPaymentOrder(total)

  const options = {
    key: "rzp_test_SOPVxagupAwp91", //replace with your key
    amount: paymentOrder.amount,
    currency: paymentOrder.currency,
    name: "Homely Meals",
    description: "Food Order Payment",
    order_id: paymentOrder.id,

    handler: async function (response) {

      try {

        // 2. Verify payment
        await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        })

        // 3. Create order AFTER payment success
        await createOrder({
          ...orderData,
          paymentMethod: "ONLINE",
          isPaid: true,
          paidAt: new Date()
        })

        alert("Payment successful & Order placed!")

        clearCart()
        navigate("/order-success")

      } catch (err) {
        console.log(err)
        alert("Payment verification failed")
      }

    },

    prefill: {
      name: address.name,
      contact: address.phone
    },

    theme: {
      color: "#ff6b6b"
    }
  }

  const razor = new window.Razorpay(options)
  razor.open()
}

    } catch (error) {

      console.log(error.response?.data || error)

      alert("Order failed. Check console.")

    }
  }

  return (
    <div className="checkout-page">

      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-grid">

        {/* Order Summary */}

        <div className="order-summary">

          <h2>Order Summary</h2>

          {cart.map(item => (
            <div
              key={item._id || item._id}
              className="order-item"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <h3 className="order-total">
            Total: ₹{total}
          </h3>

        </div>

        {/* Address Form */}

        <div className="address-form">

          <h2>Delivery Address</h2>

          <input
            placeholder="Full Name"
            value={address.name}
            onChange={(e) =>
              setAddress({ ...address, name: e.target.value })
            }
          />

          <input
            placeholder="Phone Number"
            value={address.phone}
            onChange={(e) =>
              setAddress({ ...address, phone: e.target.value })
            }
          />

          <input
            placeholder="Street Address"
            value={address.street}
            onChange={(e) =>
              setAddress({ ...address, street: e.target.value })
            }
          />

          <input
            placeholder="City"
            value={address.city}
            onChange={(e) =>
              setAddress({ ...address, city: e.target.value })
            }
          />

          <input
            placeholder="State"
            value={address.state}
            onChange={(e) =>
              setAddress({ ...address, state: e.target.value })
            }
          />

          <input
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) =>
              setAddress({ ...address, pincode: e.target.value })
            }
          />
           
         {/* Online NEW PAYMENT SECTION */}
          <div className="payment-method">
            <h3>Payment Method</h3>

            <label>
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Pay Online (Razorpay)
            </label>
          </div>

          <button
            onClick={handleOrder}
            className="place-order-btn"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  )
}

export default Checkout