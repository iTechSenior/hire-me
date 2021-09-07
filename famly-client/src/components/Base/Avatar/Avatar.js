import "./Avatar.css";

const Avatar = ({ src }) => {
  return (
    <div className="child-avatar-wrapper">
      <img className="child-avatar" src={src} alt="child avatar thumb" />
    </div>
  );
};

export default Avatar;
