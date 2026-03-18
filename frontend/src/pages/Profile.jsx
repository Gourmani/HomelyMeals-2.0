import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"

function Profile() {

  const { user, logout } = useContext(AuthContext)

  return (
    <div className="profile-page">

      <h1>Your Profile</h1>

      <div className="profile-card">

        <h3>Email</h3>
        <p>{user?.email}</p>

        <div className="profile-links">
          <Link to="/orders">
            View Your Orders
          </Link>
        </div>

        <button
          onClick={logout}
          className="primary-btn"
        >
          Logout
        </button>

      </div>

    </div>
  )
}

export default Profile