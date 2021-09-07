import { useState } from "react";
import Button from "../Button/Button";
import Avatar from "../Avatar/Avatar";
import { checkInChildApi, checkOutChildApi } from "../../service/api";
import "./ChildListItem.css";
import "rc-time-picker/assets/index.css";

const ChildListItem = ({ childData }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(childData.checkedIn);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleCheckInOut = async () => {
    try {
      setIsLoading(true);
      setError("");
      let response;
      if (isCheckedIn) {
        response = await checkOutChildApi(childData.childId);
      } else {
        response = await checkInChildApi(childData.childId, "16:00");
      }
      if (response) setIsCheckedIn(!isCheckedIn);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.error);
      console.error(`Check In Out Error : ${err}`);
    }
  };

  return (
    <div className="child-card">
      <Avatar src={childData.image.small} />
      <div className="child-info-wrapper">
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
        <div>
          {error && <span className="error-msg">{error}</span>}
          <Button
            variant={isCheckedIn ? "checkout" : "checkin"}
            loading={isLoading}
            onClick={handleCheckInOut}
          />
        </div>
      </div>
    </div>
  );
};

export default ChildListItem;
