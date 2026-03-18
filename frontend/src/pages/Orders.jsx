import { useEffect, useState } from "react"
import { getMyOrders } from "../services/orderService"
import Loader from "../components/Loader"
import { Link } from "react-router-dom"



function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders()
        setOrders(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()

  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="orders-page">

      <h1 className="orders-title">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-state">
        <h2>📦 No orders yet</h2>
        <p>You haven’t placed any orders yet</p>

          <Link to="/menu">
            <button className="empty-btn">Order Now</button>
          </Link>
            </div>
      ) : (

        orders.map(order => (

          <div
            key={order._id}
            className="order-card"
          >

            <div className="order-header">

              <h3>Order #{order._id.slice(-6)}</h3>

              <span className={`order-status status-${order.status.toLowerCase().replace(" ","-")}`}>
                {order.status}
              </span>

            </div>

            <div className="order-items">

              <div className="order-item">

                <span>
                  {order.meal?.name} × {order.quantity}
                </span>

                <span>
                  ₹{order.totalPrice}
                </span>

              </div>

            </div>

            <div className="order-footer">

              <p className="order-address">
                {order.deliveryAddress?.street}, {order.deliveryAddress?.city}
              </p>

            </div>

          </div>

        ))

      )}

    </div>
  )
}

export default Orders