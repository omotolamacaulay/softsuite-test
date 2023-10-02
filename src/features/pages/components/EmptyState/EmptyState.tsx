import React from "react"
import Icons from "../../../assets/images"
import "./EmptyState.scss"

interface EmptyStateProps {
  text: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ text }) => {
  const words = `There are no ${text} to display`

  return (
    <div className="emptyState">
      <div className="emptyState__body">
        <img src={Icons["Empty"]} alt="SVG logo" />
        <p>{words}</p>
      </div>
    </div>
  )
}

export default EmptyState
