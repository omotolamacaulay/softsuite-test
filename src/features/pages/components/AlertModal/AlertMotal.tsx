import Modal from "../Modal"
import React from "react"
import "./AlertModal.scss"

const AlertModal = ({ children }: { children: React.ReactElement }) => {
  return (
    <Modal>
      <div className="alert__modal">
        <div className="alert__modal-body">{children}</div>
      </div>
    </Modal>
  )
}

export default AlertModal
