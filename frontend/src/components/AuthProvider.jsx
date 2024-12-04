import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const AuthProvider = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname !== "/login") {
      const user = localStorage.getItem("user")
      // if (!user) {
      //   navigate("/login")
      // }
    }
  }, [location.pathname])
  return null
}

export default AuthProvider
