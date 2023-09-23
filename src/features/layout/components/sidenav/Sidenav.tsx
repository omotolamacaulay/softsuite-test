import "./Sidenav.scss"
import { navlinks } from "../../../lib/data"
import SidenavLink from "./SidenavLink"
// import Home from "../../../../assets/images/home.svg"
import PayrollMgt from "../../../assets/images/payroll-mgt.svg"
import Arrow from "../../../assets/images/arrow-down.svg"
import Dashboard from "../../../assets/images/dashboard.svg"
import Logout from "../../../assets/images/logout.svg"
import { useNavigate } from "react-router-dom"

export default function SideNav({ navIsOpen }: { navIsOpen: boolean }) {
  const navigate = useNavigate()
  // const modules = [
  //   {
  //     title: "System Administration",
  //   }
  // ]

  return (
    <nav className={`sidenav ${navIsOpen ? "open" : ""}`} data-testid="sidenav">
      <div className="sidenav__container">
        <div className="sidenav__top">
          <div role="button" className="sidenav__item">
            <img src={PayrollMgt} alt="" className="icon-left" />
            <div className="payment__grp">
              <p className="switch-module">Switch Module</p>
              <p className="payroll-mgt">Payroll Management</p>
            </div>
            <img src={Arrow} alt="" className="icon-right" />
          </div>

          <span className="sidenav__item sidenav__item--dashboard">
            <img src={Dashboard} alt="" />
            Dashboard
          </span>
        </div>
        {navlinks.map((link) => (
          <li key={link.title} className="sidenav__linkitem">
            <SidenavLink link={link} />
          </li>
        ))}

        <hr />

        <span
          role="button"
          className="sidenav__item"
          onClick={(e) => {
            e.preventDefault()
            navigate("/signin")
          }}
        >
          <img src={Logout} alt="" /> Logout
        </span>
      </div>
    </nav>
  )
}
