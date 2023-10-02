import Modal from "../Modal"
import React from "react"
import "./SideModal.scss"

const SideModal = ({ children }: { children: React.ReactElement }) => {
  return (
    <Modal>
      <div className="side__modal">
        <div className="side__modal-body">{children}</div>
      </div>
    </Modal>
  )
}

export default SideModal
