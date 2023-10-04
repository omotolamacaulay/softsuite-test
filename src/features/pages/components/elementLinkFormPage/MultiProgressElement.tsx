//@ts-nocheck
import "../../components/formpage/progressBar/MultiStepProgressBar.scss"
import { ProgressBar, Step } from "react-step-progress-bar"
const MultiProgressElement = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0
  if (page === "pageone") {
    stepPercentage = 33
  } else if (page === "pagetwo") {
    stepPercentage = 66
  } else if (page === "pagethree") {
    stepPercentage = 100
  } else {
    stepPercentage = 0
  }

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep-link-1 ${
              accomplished ? "accomplished" : null
            }`}
            onClick={() => onPageNumberClick("1")}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep-link-2 ${
              accomplished ? "accomplished" : null
            }`}
            onClick={() => onPageNumberClick("2")}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep-link-3 ${
              accomplished ? "accomplished" : null
            }`}
            onClick={() => onPageNumberClick("3")}
          >
            {index + 1}
          </div>
        )}
      </Step>
    </ProgressBar>
  )
}

export default MultiProgressElement
