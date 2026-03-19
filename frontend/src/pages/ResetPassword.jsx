import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"

function ResetPassword() {

  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)

  const handleReset = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post(`/auth/reset-password/${token}`, {
        password
      })

      setMessage({
        type: "success",
        text: res.data.message
      })

      setTimeout(() => {
        navigate("/login")
      }, 2000)

    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Reset failed"
      })
    }
  }

  return (
    <div className="auth-container-lr">

      <div className="auth-right-lr">

        <h2>Reset Password</h2>

        {message && (
          <div className={`auth-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleReset}>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary-btn">
            Reset Password
          </button>

        </form>

      </div>

    </div>
  )
}

export default ResetPassword