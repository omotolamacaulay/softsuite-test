import { DashboardLayout } from "./features/layout/components/DashboardLayout"
import "./App.css"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}></Route>
    </Routes>
  )
}

export default App
