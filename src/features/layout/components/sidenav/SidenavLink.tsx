import { NavLink } from "react-router-dom"
import { NavItem } from "../../../../types"
import Icons from "../../../assets/images"
import "./SidenavLink.scss"
import { useState } from "react"

type SidenavLinkProps = {
  link: NavItem
}

export default function SidenavLink({ link }: SidenavLinkProps) {
  const [subnav, setSubnav] = useState(false)
  const [active, setActive] = useState(false)

  const showSubNav = () => {
    setSubnav(!subnav)
    setActive(true)
  }
  return (
    <div
      className={
        link.title === "Payroll Activities" && subnav
          ? "payrollActivities"
          : "close"
      }
    >
      <NavLink
        to={link.path}
        className={`navlink ${active ? "notActive" : "active"}`}
        // data-testid="navlink"
        onClick={link.subNav && showSubNav}
      >
        <img src={Icons[link.icon]} alt="" className="navIcons" />
        {link.title}
        <div>
          {link.subNav && subnav ? (
            <img
              src={Icons[link.iconOpen]}
              alt=""
              className="arrow transitionArrow"
            />
          ) : link.subNav ? (
            <img
              src={Icons[link.iconOpen]}
              alt=""
              className="arrow rotateArrow"
            />
          ) : null}
        </div>
      </NavLink>
      <div
        className={
          link.title === "Payroll Activities"
            ? "subNav"
            : link.title === "Element Setup"
            ? "subNav2"
            : link.title === "Payroll Settings"
            ? "subNav"
            : "null"
        }
      >
        {subnav &&
          link.subNav.map((item, index) => {
            return (
              <NavLink
                to={item.path}
                key={index}
                className={
                  link.title === "Payroll Activities"
                    ? "subNav__link"
                    : link.title === "Element Setup"
                    ? "subNav2__link2"
                    : link.title === "Payroll Settings"
                    ? "subNav__link"
                    : "null"
                }
              >
                {item.title}
              </NavLink>
            )
          })}
      </div>
    </div>
  )
}
