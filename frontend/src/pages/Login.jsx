import { Button, Flex, TextInput } from "@mantine/core"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault()
    localStorage.setItem("user", email)
    navigate("/")
  }
  return (
    <form onSubmit={handleLogin}>
      <Flex style={{ height: "100vh" }} justify="center" align="center" direction="column" gap="xs">
        <TextInput type="email" required placeholder="Email" onChange={(event) => setEmail(event.currentTarget.value)} value={email} />
        <Button type="submit">Login</Button>
      </Flex>
    </form>
  )
}

export default Login
