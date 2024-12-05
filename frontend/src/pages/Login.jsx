import { Button, Flex, TextInput } from "@mantine/core"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const handleLogin = () => {
    localStorage.setItem("user", email)
    navigate("/")
  }
  return (
    <Flex style={{ height: "100vh" }} justify="center" align="center" direction="column" gap="xs">
      <TextInput placeholder="Email" onChange={(event) => setEmail(event.currentTarget.value)} value={email} />
      <Button onClick={handleLogin}>Login</Button>
    </Flex>
  )
}

export default Login
