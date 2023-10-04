//@ts-nocheck
import "./MultiStepProgressBar.scss"
import { ProgressBar, Step } from "react-step-progress-bar"
// import Icons from "../../../../assets/images"

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0
  if (page === "pageone") {
    stepPercentage = 50
  } else if (page === "pagetwo") {
    stepPercentage = 100
  } else {
    stepPercentage = 0
  }

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep-1 ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("1")}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep-2 ${accomplished ? "accomplished" : null}`}
            // onClick={() => onPageNumberClick("2")}
          >
            {index + 1}
          </div>
        )}
      </Step>
    </ProgressBar>
  )
}

export default MultiStepProgressBar
