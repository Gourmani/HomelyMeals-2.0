import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "../services/authService"
import { TypeAnimation } from "react-type-animation"

function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)

  const handleRegister = async (e) => {
  e.preventDefault()

  if (!name || !email || !password) {
    setMessage({ type: "error", text: "Please fill all fields" })
    return
  }

  try {
    const res = await registerUser({ name, email, password })

    //  ONLY SUCCESS MESSAGE
    setMessage({
      type: "success",
      text: res.message//changes made here to show only success message and not token
    })

    // redirect after 2 sec
    setTimeout(() => {
      navigate("/login")
    }, 2000)

  } catch (error) {

  console.log("ERROR RESPONSE:", error.response)

  if (error.response && error.response.data && error.response.data.message) {
    setMessage({
      type: "error",
      text: error.response.data.message
    })
  } else {
    setMessage({
      type: "error",
      text: "Server not responding. Please Resister again."
    })
  }
} }


  return (
    <div className="auth-container-lr">

      {/* LEFT */}
      <div className="auth-left-lr">
        <h1>
          <TypeAnimation
            sequence={[
              "Start Eating Healthy Today! ",
              2000,
              "No Cooking Stress 👩‍🍳",
              2000,
              "Eat Better. Live Better 💪",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </h1>

        <p>Fresh, affordable meals designed for your daily life</p>

        <ul>
          <li>✔ No cooking stress</li>
          <li>✔ Clean & hygienic food</li>
          <li>✔ Flexible meal plans</li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="auth-right-lr">
        <h2>Register</h2>

        {/*  MESSAGE UI */}
        {message && (
          <div className={`auth-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter your email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password (Min 8 chars, 1 uppercase, 1 number, 1 special char)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="primary-btn">
            Register
          </button>

        </form>

        <p className="auth-switch-lr">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

    </div>
  )
}

export default Register