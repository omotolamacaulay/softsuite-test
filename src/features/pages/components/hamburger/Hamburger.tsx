// @ts-nocheck
import { SetStateAction, useState } from "react"
import "./Hamburger.scss"
import type { MenuProps } from "antd"
import { Button, Dropdown } from "antd"
import { Link } from "react-router-dom"
import Icons from "../../../assets/images"
import { useAppDispatch } from "../../../../app/hooks"
import { useDeleteSingleElementMutation } from "../../../counter/apiSlice"
import {
  // fetchSingleElement,
  setCurrentEditElement,
} from "../../../counter/elementSlice"
import AlertModal from "../AlertModal/AlertMotal"
import SuccessModal from "../SuccessModal/SuccessModal"
import ConfirmModal from "../ConfirmModal/ConfirmModal"
// interface UserIdProps {
//   user: Elements
// }

const HamburgerButton = ({
  user,
  setShowModal,
  setFormType,
  closeConfirmModal,
  triggerNextModal,
}: {
  user: Element
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  setFormType: React.Dispatch<SetStateAction<"ADD" | "EDIT">>
  closeConfirmModal: () => void
  triggerNextModal: () => void
}) => {
  const dispatch = useAppDispatch()
  const [alertModal, setAlertModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [deleteElement, isSuccess] = useDeleteSingleElementMutation()
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
            setConfirmModal(true)
          }}
        >
          <img src={Icons["Delete"]} alt="" />
          Delete Element
        </span>
      ),
    },
  ]
  return (
    <div>
      <Dropdown menu={{ items }} placement="bottom" className="dropdown-btn">
        <Button className="li">
          <img src={Icons["More"]} alt="" />{" "}
        </Button>
      </Dropdown>
      {alertModal && (
        <AlertModal>
          <SuccessModal
            text="Element Deleted successfully"
            closeSuccessModal={() => {
              setAlertModal(false)
            }}
          />
        </AlertModal>
      )}
      {confirmModal && (
        <AlertModal>
          <ConfirmModal
            text="Are you sure you want to 
          delete Element?"
            closeConfirmModal={() => {
              setConfirmModal(false)
            }}
            triggerNextModal={() => {
              setConfirmModal(false)
              deleteElement(user.id)
              if (isSuccess) {
                setAlertModal(true)
              }
            }}
          />
        </AlertModal>
      )}
    </div>
  )
}

export default HamburgerButton
