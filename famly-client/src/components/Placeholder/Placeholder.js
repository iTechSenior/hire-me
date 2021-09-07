import "./Placeholder.css";

const Placeholder = () => {
  return (
    <div className="child-card-skeleton">
      <div className="avatar-skeleton skeleton-loader" />
      <div className="child-info-wrapper-skeleton">
        <div className="child-info-skeleton">
          <div className="name-skeleton skeleton-loader" />
          <div className="status-skeleton skeleton-loader" />
        </div>
      </div>
      <div className="child-action-skeleton skeleton-loader" />
    </div>
  );
};

export default Placeholder;
