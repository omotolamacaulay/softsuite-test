import React from "react"
import Icons from "../../../assets/images"
import "./SuccessModal.scss"

type SuccessModalProps = {
  text: string
  closeSuccessModal: () => void
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  text,
  closeSuccessModal,
}) => {
  return (
    <div className="success-modal-body">
      <img src={Icons["Approve"]} alt="" />
      <p>{text}</p>
      <button type="button" onClick={closeSuccessModal}>
        Close to continue
      </button>
    </div>
  )
}

export default SuccessModal
