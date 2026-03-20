import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"

const VerifyEmail = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const verify = async () => {
      try {
        await API.get(`/auth/verify/${token}`)
        alert("Email verified successfully!")
        navigate("/login")
      } catch (err) {
        alert("Verification failed")
      }
    }

    verify()
  }, [token, navigate])

  return <h2>Verifying your email...</h2>
}

export default VerifyEmail