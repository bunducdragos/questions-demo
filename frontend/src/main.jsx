import ReactDOM from "react-dom/client"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import "@mantine/core/styles.css"
import React from "react"
import "@mantine/dates/styles.css"
import "@mantine/notifications/styles.css"
import "./index.css"
import Router from "./Router"
import axios from "axios"
import { ModalsProvider } from "@mantine/modals"

axios.defaults.baseURL = "http://localhost:3000"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <ModalsProvider>
        <Notifications />
        <Router />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
)
