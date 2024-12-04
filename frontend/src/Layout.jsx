import { AppShell } from "@mantine/core"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <div>Questions Demo</div>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default Layout
