import { Link } from "react-router-dom"

function OrderSuccess() {

  return (
    <div className="success-page">

      <div className="success-card">

        <h1>✅ Order Placed Successfully!</h1>

        <p>Your delicious meal is being prepared.</p>

        <div className="success-buttons">

          <Link to="/orders">
            <button className="success-btn">
              View Orders
            </button>
          </Link>

          <Link to="/menu">
            <button className="success-btn secondary">
              Back to Menu
            </button>
          </Link>

        </div>

      </div>

    </div>
  )
}

export default OrderSuccess