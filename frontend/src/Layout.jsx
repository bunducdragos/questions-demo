import { AppShell, Button, Flex } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Layout = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header style={{ display: "block", alignContent: "center" }}>
        <Flex align="center" justify="space-between" m="xs">
          <div>Questions Demo</div>
          <Flex gap="xs">
            <div style={{ alignSelf: "center" }}>{localStorage.getItem("user")}</div>
            <Button onClick={handleLogout}>Logout</Button>
          </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default Layout
