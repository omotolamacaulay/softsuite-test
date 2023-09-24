import { DashboardLayout } from "./features/layout/components/DashboardLayout"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import Elements from "./features/pages/elementslist/Elements"

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Elements />} />
      </Route>
    </Routes>
  )
}

export default App
