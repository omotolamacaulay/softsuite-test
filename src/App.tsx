import { DashboardLayout } from "./features/layout/components/DashboardLayout"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import Elements from "./features/pages/elementslist/Elements"
import Notfound from "./features/pages/components/notFound/Notfound"
import ElementDetail from "./features/pages/elementdetails/Element"

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/" index element={<Elements />} />
        <Route path="/elements/:id" element={<ElementDetail />} />
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  )
}

export default App
