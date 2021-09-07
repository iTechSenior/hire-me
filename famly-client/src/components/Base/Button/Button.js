import ClipLoader from "react-spinners/ClipLoader";
import "./Button.css";

const Button = ({ variant, loading, onClick }) => {
  const buttonTitle = variant === "checkin" ? "Check In" : "Check Out";
  return (
    <button
      className={`button ${
        variant === "checkin" ? "btn-checkin" : "btn-checkout"
      }`}
      onClick={onClick}
    >
      {loading ? (
        <ClipLoader loading={loading} size={20} color="white" />
      ) : (
        buttonTitle
      )}
    </button>
  );
};

export default Button;
