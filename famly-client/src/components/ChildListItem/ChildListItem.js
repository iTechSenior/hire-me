import { useState } from "react";
import TimeField from "react-simple-timefield";
import Button from "../Button/Button";
import Avatar from "../Avatar/Avatar";
import { checkInChildApi, checkOutChildApi } from "../../service/api";
import "./ChildListItem.css";

const ChildListItem = ({ childData }) => {
  const [pickupTime, setPickUpTime] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(childData.checkedIn);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleCheckInOut = async () => {
    setIsLoading(true);
    setError("");
    if (!isCheckedIn) {
      if (pickupTime === "") {
        setError("Please provide pick up time.");
        setIsLoading(false);
        return;
      } else {
        try {
          const response = await checkInChildApi(childData.childId, pickupTime);
          if (response) {
            setIsCheckedIn(!isCheckedIn);
            setIsLoading(false);
          }
        } catch (err) {
          setIsLoading(false);
          setError(err.response.data.error);
          console.error(`Check In Error: ${err}`);
        }
      }
    } else {
      try {
        const response = await checkOutChildApi(childData.childId);
        if (response) {
          setIsCheckedIn(!isCheckedIn);
          setPickUpTime("");
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setError(err.response.data.error);
        console.error(`Check Out Error: ${err}`);
      }
    }
  };

  const handleTimePick = (e, value) => {
    setPickUpTime(value);
  };

  return (
    <>
      <div className="child-card">
        <div className="child-info-wrapper">
          <Avatar src={childData.image.small} />
          <div className="child-info">
            <div className="child-name">{childData.name.fullName}</div>
            <div
              className={`child-status ${
                isCheckedIn ? "child-checkin" : "child-checkout"
              }`}
            >
              {isCheckedIn ? "Checked In" : "Checked Out"}
            </div>
          </div>
        </div>
        <div className="child-action-wrapper">
          {!isCheckedIn && (
            <div className="timepicker-wrapper">
              <div className="timepicker-label">Pick Up Time</div>
              <TimeField
                value={pickupTime}
                onChange={handleTimePick}
                colon=":"
                style={{
                  border: "1px solid #666",
                  fontSize: 16,
                  width: 60,
                  padding: "5px 8px",
                  color: "#333",
                  borderRadius: 10,
                }}
              />
            </div>
          )}
          <Button
            variant={isCheckedIn ? "checkout" : "checkin"}
            loading={isLoading}
            onClick={handleCheckInOut}
          />
        </div>
      </div>
      {error && <p className="error-msg">{error}</p>}
    </>
  );
};

export default ChildListItem;
