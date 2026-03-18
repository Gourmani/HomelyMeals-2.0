import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/authService"

function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {

    e.preventDefault()

    if (!name || !email || !password) {
      alert("Please fill all fields")
      return
    }

    try {

      await registerUser({ name, email, password })

      alert("Registration successful!")

      navigate("/login")

    } catch (error) {

      console.log(error)

      alert("Registration failed")

    }

  }

  return (
    <div style={{ padding: "40px" }}>

      <h1>Register</h1>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  )
}

export default Register