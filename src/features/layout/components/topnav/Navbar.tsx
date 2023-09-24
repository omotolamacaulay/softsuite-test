import { Link } from "react-router-dom"
import "./Navbar.scss"
import Icons from "../../../assets/images"
import { useState, useEffect } from "react"
type NavbarProps = {
  toggleNav: () => void
  navIsOpen: boolean
}
export default function Navbar({ toggleNav, navIsOpen }: NavbarProps) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear())
    }, 60000)

    return () => clearInterval(intervalId)
  }, [])
  return (
    <div className="body">
      <nav className="navbar">
        <Link to="/" className="navbar__logo">
          <img src={Icons["Logo"]} alt="SVG logo" />
        </Link>
        <div className="navbar__items">
          <div className="navbar__company">
            <img src={Icons["Home"]} alt="Home" className="home" />
            <div className="company__profile">
              <span className="change-org">Change Organization</span>
              <span className="org-name">PaperSoft Limited</span>
            </div>
            <img src={Icons["ArrowDown"]} alt="Arrow" className="arrow" />
          </div>
          <div className="navbar__search">
            <div className="navbar__search-group">
              <input
                type="search"
                className="form-input"
                placeholder="Search for anything"
              />
              <span className="icon">
                <img src={Icons["Search"]} alt="SVG logo" />
              </span>
            </div>
          </div>

          <div className="navbar__actions">
            <span role="button" className="notification">
              <img src={Icons["Notification"]} alt="SVG logo" />
            </span>
            <span className="current-user">
              <img src={Icons["User"]} alt="user avatar" />
              <div className="user-profile">
                <span className="username">Henry Okoro</span>
                <span className="role">Payroll Manager</span>
              </div>
            </span>
          </div>

          <div
            className="navbar__actions--mobile"
            role="button"
            onClick={toggleNav}
          >
            {navIsOpen ? (
              <img src={Icons["Close"]} alt="" />
            ) : (
              <img src={Icons["Hamburger"]} alt="" />
            )}
          </div>
        </div>
      </nav>
      <footer className="bottom">
        <p>&copy; {currentYear} SoftSuite. All rights reserved</p>
        <p>support@softsuite.com</p>
      </footer>
    </div>
  )
}
