import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from "react-router-dom"

function CartDrawer({ isOpen, onClose }) {

  const { cart } = useContext(CartContext)

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (!isOpen) return null

  return (
    <div className="cart-overlay">

      <div className="cart-drawer">

        <button className="cart-close-btn" onClick={onClose}>
          ✕
        </button>

        <h2 className="cart-title">Your Cart</h2>
            {cart.length === 0 ? (
              <div className="empty-state">
                <h3>🛒 Your cart is empty</h3>
                <p>Add some delicious meals</p>

                <button
                  className="empty-btn"
                  onClick={onClose}
                >
                  Browse Meals
                </button>
              </div>
              ) : (
          <>
            <div className="cart-items">

              {cart.map(item => (
                <div key={item._id} className="cart-item">

                  <div>
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-qty">Qty: {item.quantity}</p>
                  </div>

                  <p>₹ {item.price * item.quantity}</p>

                </div>
              ))}

            </div>

            <h3 className="cart-total">
              Total: ₹ {total}
            </h3>

            <Link to="/cart">
              <button className="cart-view-btn">
                View Cart
              </button>
            </Link>
          </>
        )}

      </div>

    </div>
  )
}

export default CartDrawer