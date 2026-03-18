import { useEffect, useState } from "react"
import API from "../services/api"

function AdminDashboard() {

  const [stats, setStats] = useState({})

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/dashboard")
      setStats(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const cards = [
    { title: "Total Users", value: stats.totalUsers },
    { title: "Total Orders", value: stats.totalOrders },
    { title: "Total Meals", value: stats.totalMeals },
    { title: "Revenue (₹)", value: stats.totalRevenue }
  ]

  return (
    <div className="admin-container">

      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="dashboard-grid">

        {cards.map((card, index) => (
          <div key={index} className="dashboard-card">

            <h2>{card.value || 0}</h2>
            <p>{card.title}</p>

          </div>
        ))}

      </div>

    </div>
  )
}

export default AdminDashboard