import { Outlet } from "react-router-dom"
import "./DashboardLayout.scss"
import SideNav from "../components/sidenav/Sidenav"
import Navbar from "../components/topnav/Navbar"
import { useState } from "react"

export function DashboardLayout() {
  const [navIsOpen, setIsOpen] = useState<boolean>(false)

  const toggleNav = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="dashboard">
      <Navbar toggleNav={toggleNav} navIsOpen={navIsOpen} />
      <SideNav navIsOpen={navIsOpen} />
      <div className="dashboard__body">
        <Outlet />
      </div>
    </div>
  )
}
