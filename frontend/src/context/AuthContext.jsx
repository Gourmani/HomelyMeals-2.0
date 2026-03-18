import { createContext, useState } from "react"
import { loginUser } from "../services/authService"

export const AuthContext = createContext()

export function AuthProvider({ children }) {

  const storedUser = localStorage.getItem("user")

  const [user, setUser] = useState(
    storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null
  )

  const login = async (email, password) => {
    try {

      const data = await loginUser({ email, password })

      setUser(data.user)

      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)

    } catch (error) {
      console.log(error)
      alert("Login failed")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}