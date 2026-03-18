import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import CartDrawer from "./CartDrawer"

function Navbar() {

  const { cart } = useContext(CartContext)
  const { user, logout } = useContext(AuthContext)

  const [isCartOpen, setIsCartOpen] = useState(false)

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <>
      <nav className="navbar">

        {/* LOGO */}
        <h2 className="logo">
           Homely Meals
        </h2>

        {/* LINKS */}
        <div className="nav-links">

          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/subscriptions">Plans</Link>

          {/* CART */}
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="cart-btn"
          >
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>

          {/* AUTH */}
          {user ? (
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/register" className="primary-btn">Register</Link>
            </>
          )}

        </div>

      </nav>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  )
}

export default Navbar