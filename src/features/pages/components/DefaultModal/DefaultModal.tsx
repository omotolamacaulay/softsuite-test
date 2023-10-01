import Modal from "../Modal"
import React from "react"
import "./DefaultModal.scss"

const DefaultModal = ({ children }: { children: React.ReactElement }) => {
  return (
    <Modal>
      <div className="default__modal">
        <div className="default__modal-body">{children}</div>
      </div>
    </Modal>
  )
}

export default DefaultModal
