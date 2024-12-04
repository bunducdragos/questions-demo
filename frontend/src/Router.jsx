import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./Layout"
import Login from "./pages/Login"
import AuthProvider from "./components/AuthProvider"

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
