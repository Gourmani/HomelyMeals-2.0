import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { TypeAnimation } from "react-type-animation"

function Login() {

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
  e.preventDefault()

  if (!email || !password) {
    alert("Enter email and password")
    return
  }

  try {
    const res = await loginUser({ email, password })

    if (res.token) {
      localStorage.setItem("token", res.token) // IMPORTANT
      alert("Login successful!")
      navigate("/")
    } else {
      alert(res.message)
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed")
  }
}

  return (
    <div className="auth-container-lr">

      {/* LEFT SIDE */}
      <div className="auth-left-lr">
        <h1>
          <TypeAnimation
            sequence={[
              "Welcome Back 👋",
              2000,
              "Fresh Meals Daily 🍱",
              2000,
              "Healthy & Affordable 💰",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </h1>

        <p>Login to continue your healthy meal journey</p>

        <ul>
          <li>🍱 Fresh homemade meals daily</li>
          <li>💰 Affordable student pricing</li>
          <li>🚚 Delivered to your doorstep</li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right-lr">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="primary-btn-lr">
            Login
          </button>

        </form>
                <p style={{marginTop:"10px"}}>
                <Link to="/forgot-password">Forgot Password?</Link>
              </p>
        <p className="auth-switch-lr">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>

    </div>
  )
}

export default Login