import Modal from "../Modal"
import React from "react"
import "../DefaultModal/DefaultModal.scss"

const ElementLinkModal = ({ children }: { children: React.ReactElement }) => {
  return (
    <Modal>
      <div className="default__modal">
        <div className="default__modal-body">{children}</div>
      </div>
    </Modal>
  )
}

export default ElementLinkModal
