import { useEffect, useState } from "react"
import API from "../services/api"

function AdminOrders() {

  const [orders, setOrders] = useState([])

  // ✅ Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders")
      setOrders(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // ✅ Update order status
  const updateStatus = async (id, newStatus) => {
    try {

      await API.put(`/admin/orders/${id}`, { status: newStatus })

      setOrders(prev =>
        prev.map(order =>
          order._id === id
            ? { ...order, status: newStatus }
            : order
        )
      )

    } catch (error) {
      console.log(error)
      alert("Status update failed")
    }
  }

  return (
    <div className="admin-container">

      <h1 className="admin-title">Manage Orders</h1>

      <table className="admin-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Meal</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Status</th>
            <th>Payment</th>
          </tr>
        </thead>

        <tbody>

          {orders.map(order => (
            <tr key={order._id}>

              <td>{order._id.slice(-5)}</td>

              <td>{order.user?.name}</td>

              <td>
                {order.meal?.name || "Deleted Meal"}
              </td>

              <td>{order.quantity}</td>

              <td>₹{order.totalPrice}</td>

              {/* STATUS DROPDOWN */}
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className={`status-select ${order.status.toLowerCase()}`}
                >
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>

             <span className={order.isPaid ? "paid" : "unpaid"}>
  {order.isPaid ? "Paid ✅" : "Unpaid ❌"}
</span>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default AdminOrders