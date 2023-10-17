//@ts-nocheck
import { Link } from "react-router-dom"
import Icons from "../../assets/images"
import useGetElementCategory from "../../hooks/useGetElementCategory"
import useGetElementClassification from "../../hooks/useGetElementClassification"
import useGetPayrun from "../../hooks/useGetPayrun"

type ElementDetailsProps = {
  singleElement: Element
  isSuccess: boolean
}
const ElementDetails: React.FC<ElementDetailsProps> = ({
  singleElement,
  isSuccess,
}) => {
  const { elementCategoryData } = useGetElementCategory()
  const { elementClassificationData } = useGetElementClassification()
  const { payrunData } = useGetPayrun()

  return (
    <div className="page__header">
      <div className="element__back">
        <Link to="/">
          <img src={Icons["Back"]} alt="SVG logo" />
        </Link>
      </div>
      <h2>Element Details</h2>
      {
        <div className="element__detail">
          <div className="single__detail">
            <p className="element__label">Element Name</p>
            <p className="element__text">{singleElement?.name}</p>
          </div>
          <div className="single__detail">
            <p className="element__label">Element Classification</p>
            <p className="element__text">
              {
                useGetElementClassification(
                  singleElement?.classificationId,
                  elementClassificationData,
                  isSuccess,
                ).elementClassificationName
              }
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">ELEMENT category</p>
            <p className="element__text">
              {
                useGetElementCategory(
                  singleElement?.categoryValueId,
                  elementCategoryData,
                ).elementCategoryName
              }
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">payrun</p>
            <p className="element__text">
              {useGetPayrun(singleElement?.payRunId, payrunData).payrunName}
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
      }
    </div>
  )
}

export default ElementDetails
