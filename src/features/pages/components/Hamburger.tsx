// import { Elements } from "../../../types"
import "./Hamburger.scss"
import type { MenuProps } from "antd"
import { Button, Dropdown } from "antd"
import { Link } from "react-router-dom"
import Icons from "../../assets/images"

// interface UserIdProps {
//   user: Elements
// }

const HamburgerButton = ({ id }: { id: string | undefined }) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          rel="noopener noreferrer"
          to={`/elements/${id}`}
          className="dropdown-item"
        >
          <img src={Icons["View"]} alt="" /> View Element Links
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <span role="button" className="dropdown-item">
          <img src={Icons["Edit"]} alt="" /> Edit Element
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span role="button" className=" danger-item">
          <img src={Icons["Delete"]} alt="" />
          Delete Element
        </span>
      ),
    },
  ]
  return (
    <Dropdown menu={{ items }} placement="bottom" className="dropdown-btn">
      <Button className="li">
        <img src={Icons["More"]} alt="" />{" "}
      </Button>
    </Dropdown>
  )
}

export default HamburgerButton
