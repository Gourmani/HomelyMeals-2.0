import { useState } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"

function ForgotPassword() {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email" })
      return
    }

    try {
      const res = await API.post("/auth/forgot-password", { email })

      setMessage({
        type: "success",
        text: res.data.message
      })

    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Something went wrong"
      })
    }
  }

  return (
    <div className="auth-container-lr">

      <div className="auth-right-lr">

        <h2>Forgot Password</h2>

        <p style={{marginBottom:"10px", color:"#555"}}>
          Enter your email to receive a reset link
        </p>

        {message && (
          <div className={`auth-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button 
                        className="primary-btn-fp"
                        style={{ 
                            width: "100%",
                            textAlign: "center",
                            background: "linear-gradient(135deg, #ff7a00, #ff9a3c)",
                            color: "white",
                            padding: "12px",
                            borderRadius: "10px",
                            border: "none",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease"
                        }}
                        >
                        Send Reset Link
                        </button>

        </form>

        <p className="auth-switch-lr">
          Remember password? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  )
}

export default ForgotPassword