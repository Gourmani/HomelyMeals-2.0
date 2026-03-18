import { useEffect, useState } from "react"
import API from "../services/api"


function AdminUsers() {

  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users")
      setUsers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="admin-container">

      <h1 className="admin-title">Manage Users</h1>

      <table className="admin-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>

          {users.map(user => (
            <tr key={user._id}>

              <td>{user._id.slice(-5)}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default AdminUsers