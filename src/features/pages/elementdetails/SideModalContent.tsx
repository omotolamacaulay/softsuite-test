//@ts-nocheck
import React from "react"
import Icons from "../../assets/images"
import useGetEmployeeCategory from "../../hooks/useGetEmployeeCategory"
import useGetDepartmentname from "../../hooks/useGetDepartmentName"
import useFetchSuborganizations from "../../hooks/useGetSuborganization"
import useFetchLocation from "../../hooks/useGetLocation"
import useFetchemployeeType from "../../hooks/useGetEmployeeType"
import useFetchGrade from "../../hooks/useGetGrade"
import useGetGradeSteps from "../../hooks/useGetGradeSteps"
import useFetchWardrobe from "../../hooks/useGetWardrobe"
import useFetchHousing from "../../hooks/useGetHousing"

const SideModalContent = ({
  currentLinkDetails,
  setShowSideModal,
  employeeCategoryData,
  suborganizationsData,
  locationData,
  employeeTypeData,
  gradeData,
  wardrobeData,
  housingData,
}) => {
  return (
    <div className="elementLinkDetails">
      <div className="page__header" style={{ padding: "32px" }}>
        <button
          className="closeElementLink"
          onClick={() => setShowSideModal(false)}
        >
          <img src={Icons["CloseModal"]} alt="" />
        </button>
        <h2>Element Detail</h2>
        <div className="element__detail">
          <div className="single__detail">
            <p className="element__label">NAME</p>
            <p className="element__text">{currentLinkDetails?.name}</p>
          </div>
          <div className="single__detail">
            <p className="element__label">sub organization</p>
            <p className="element__text">
              {
                useFetchSuborganizations(
                  currentLinkDetails?.suborganizationId,
                  suborganizationsData,
                ).suborganizationName
              }
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Department</p>
            <p className="element__text">
              {useGetDepartmentname(
                currentLinkDetails?.suborganizationId,
                currentLinkDetails?.departmentId,
              )}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Location</p>
            <p className="element__text">
              {
                useFetchLocation(currentLinkDetails?.locationId, locationData)
                  .locationName
              }
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Employee Type</p>
            <p className="element__text">
              {
                useFetchemployeeType(
                  currentLinkDetails?.employeeTypeId,
                  employeeTypeData,
                ).employeeTypeName
              }
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Employee Category</p>
            <p className="element__text">
              {
                useGetEmployeeCategory(
                  currentLinkDetails?.employeeCategoryId,
                  employeeCategoryData,
                ).employeeCategoryName
              }
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Effective Date</p>
            <p className="element__text">
              {currentLinkDetails?.effectiveStartDate}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Status</p>
            <p className="element__text">
              {currentLinkDetails?.status === true ||
              currentLinkDetails?.status === "active" ||
              currentLinkDetails?.status === "Active"
                ? "Active"
                : currentLinkDetails?.status === false ||
                  currentLinkDetails?.status === "inactive" ||
                  currentLinkDetails?.status === "Inactive" ||
                  currentLinkDetails?.status === ""
                ? "Inactive"
                : "Unknown"}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">GRADE</p>
            <p className="element__text">
              {useFetchGrade(currentLinkDetails?.grade, gradeData).gradeName}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Grade Step</p>
            <p className="element__text">
              {useGetGradeSteps(
                currentLinkDetails?.grade,
                currentLinkDetails?.gradeStep,
              )}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Amount Type</p>
            <p className="element__text">{currentLinkDetails?.amountType}</p>
          </div>
          <div className="single__detail">
            <p className="element__label">Amount/Rate</p>
            <p className="element__text">
              {currentLinkDetails?.amount
                ? `NGN ${currentLinkDetails?.amount}`
                : `${currentLinkDetails?.rate}%`}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Wardrobe</p>
            <p className="element__text">
              {
                useFetchWardrobe(
                  currentLinkDetails?.additionalInfo[0].lookupValueId,
                  wardrobeData,
                ).wardrobeName
              }
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Housing</p>
            <p className="element__text">
              {
                useFetchHousing(
                  currentLinkDetails?.additionalInfo[1].lookupValueId,
                  housingData,
                ).housingName
              }
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Effective Start Date</p>
            <p className="element__text">
              {currentLinkDetails?.effectiveStartDate}
            </p>
          </div>
          <div className="single__detail">
            <p className="element__label">Effective End Date</p>
            <p className="element__text">
              {currentLinkDetails?.effectiveEndDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideModalContent

// {getHousing(
//   currentLinkDetails?.additionalInfo[1].lookupValueId,
// )}
