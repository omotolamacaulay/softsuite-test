//@ts-nocheck
import { useState } from "react"
import { NavLink } from "react-router-dom"
import Icons from "../../../assets/images"
import "./SidenavLink.scss"
import { NavItem } from "../../../../types"

type SidenavLinkProps = {
  link: NavItem
}

export default function SidenavLink({ link }: SidenavLinkProps) {
  const [subnav, setSubnav] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const showSubNav = () => {
    setSubnav(!subnav)
    setIsActive(true)
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
        className={`navlink ${isActive ? "active" : ""}`}
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
                onClick={() => setIsActive(!isActive)}
              >
                {item.title}
              </NavLink>
            )
          })}
      </div>
    </div>
  )
}
