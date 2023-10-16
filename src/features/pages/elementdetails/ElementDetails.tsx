//@ts-nocheck
import { Link } from "react-router-dom"
import Icons from "../../assets/images"
type ElementDetailsProps = {
  singleElement: Element
  isSuccess: boolean
  getPayrun: (payRunId: number) => string
  getClassificationData: (classificationId: number) => string
  getCategoryName: (categoryValueId: number | undefined) => string
}
const ElementDetails: React.FC<ElementDetailsProps> = ({
  singleElement,
  isSuccess,
  getPayrun,
  getClassificationData,
  getCategoryName,
}) => {
  return (
    <div className="page__header">
      <div className="element__back">
        <Link to="/">
          <img src={Icons["Back"]} alt="SVG logo" />
        </Link>
      </div>
      <h2>Element Details</h2>
      {isSuccess ? (
        <div className="element__detail">
          <div className="single__detail">
            <p className="element__label">Element Name</p>
            <p className="element__text">{singleElement?.name}</p>
          </div>
          <div className="single__detail">
            <p className="element__label">Element Classification</p>
            <p className="element__text">
              {getClassificationData(singleElement?.classificationId)}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">ELEMENT category</p>
            <p className="element__text">
              {getCategoryName(singleElement?.categoryValueId)}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">payrun</p>
            <p className="element__text">
              {getPayrun(singleElement?.payRunId)}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Effective Start Date</p>
            <p className="element__text">{singleElement?.effectiveStartDate}</p>
          </div>
          <div className="single__detail">
            <p className="element__label">Effective END Date</p>
            <p className="element__text">{singleElement?.effectiveEndDate}</p>
          </div>
          <div className="single__detail">
            <p className="element__label">PROCESSING TYPE</p>
            <p className="element__text">
              {singleElement?.processingType === "1"
                ? "Open"
                : singleElement?.processingType === "2"
                ? "Closed"
                : ""}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">PAY frequency</p>
            <p className="element__text">
              {singleElement?.payFrequency === "1"
                ? "Monthly"
                : singleElement?.payFrequency === "2"
                ? "Selected Months"
                : ""}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Pay Months</p>
            <p className="element__text">{singleElement?.selectedMonths}</p>
          </div>
          <div className="single__detail">
            <p className="element__label">Prorate</p>
            <p className="element__text">
              {singleElement?.prorate === "1"
                ? "Yes"
                : singleElement?.prorate === "2"
                ? "No"
                : ""}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Status</p>
            <p className="element__text">
              {singleElement?.status === true ||
              singleElement?.status === "active" ||
              singleElement?.status === "Active"
                ? "Active"
                : singleElement?.status === false ||
                  singleElement?.status === "inactive" ||
                  singleElement?.status === "Inactive" ||
                  singleElement?.status === ""
                ? "Inactive"
                : "Unknown"}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label" style={{ display: "none" }}>
              Prorate
            </p>
            <p className="element__text" style={{ display: "none" }}>
              Yes
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default ElementDetails
