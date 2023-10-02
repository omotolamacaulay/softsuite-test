// @ts-nocheck
import { SetStateAction } from "react"
import "./Hamburger.scss"
import type { MenuProps } from "antd"
import { Button, Dropdown } from "antd"
import { Link } from "react-router-dom"
import Icons from "../../../assets/images"
import { useAppDispatch } from "../../../../app/hooks"
import {
  // fetchSingleElement,
  setCurrentEditElement,
  deleteSingleElement,
} from "../../../counter/elementSlice"

// interface UserIdProps {
//   user: Elements
// }

const HamburgerButton = ({
  user,
  setShowModal,
  setFormType,
}: {
  user: Element
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  setFormType: React.Dispatch<SetStateAction<"ADD" | "EDIT">>
}) => {
  const dispatch = useAppDispatch()
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          rel="noopener noreferrer"
          to={`/elements/${user.id}`}
          className="dropdown-item"
        >
          <img src={Icons["View"]} alt="" /> View Element Links
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <span
          role="button"
          className="dropdown-item"
          onClick={() => {
            dispatch(setCurrentEditElement(user))
            setFormType("EDIT")
            setShowModal(true)
          }}
        >
          <img src={Icons["Edit"]} alt="" /> Edit Element
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span
          role="button"
          className=" danger-item"
          onClick={() => {
            dispatch(deleteSingleElement(user.id))
          }}
        >
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
