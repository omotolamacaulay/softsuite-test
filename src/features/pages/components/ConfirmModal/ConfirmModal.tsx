import React from "react"
import Icons from "../../../assets/images"
import "./ConfirmModal.scss"

type ConfirmModalProps = {
  text: string
  closeConfirmModal: () => void
  triggerNextModal: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  text,
  closeConfirmModal,
  triggerNextModal,
}) => {
  return (
    <div className="confirm-modal-body">
      <img src={Icons["Confirm"]} alt="" />
      <p>{text}</p>
      <span>You can’t reverse this action</span>
      <div className="buttonGroup">
        <button type="button" className="cancel" onClick={closeConfirmModal}>
          Cancel
        </button>
        <button type="button" className="confirm" onClick={triggerNextModal}>
          Yes, Delete
        </button>
      </div>
    </div>
  )
}

export default ConfirmModal
