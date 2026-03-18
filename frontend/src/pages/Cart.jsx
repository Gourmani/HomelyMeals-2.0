import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from "react-router-dom"

function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext)

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="cart-page">

      <h1 className="cart-page-title">Your Cart</h1>

        {cart.length === 0 ? (
  <div className="empty-state">
    <h2>🛒 Your cart is empty</h2>
    <p>Start adding delicious meals to your cart</p>

    <Link to="/menu">
      <button className="empty-btn">Browse Meals</button>
    </Link>
  </div>
      ) : 
       (
        <div className="cart-list">

          {cart.map(item => (
            <div key={item._id} className="cart-row">

              <div className="cart-info">

                <h3>{item.name}</h3>

                <p>₹ {item.price}</p>

                <div className="cart-qty-controls">

                  <button onClick={() => decreaseQuantity(item._id)}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item._id)}>
                    +
                  </button>

                </div>

              </div>

              <button
                className="cart-remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>

            </div>
          ))}

          <h2 className="cart-total">
            Total: ₹ {total}
          </h2>

          <Link to="/checkout">
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </Link>

        </div>
      )}

    </div>
  )
}

export default Cart