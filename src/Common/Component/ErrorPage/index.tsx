import React, { memo } from "react";
import "./ErrorPage.css";

const ErrorPage: React.FC = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">Oops!</h1>
        <p className="error-message">Something went wrong.</p>
        <p className="error-details">The page you are looking for doesn't exist or something went wrong. Please try again later.</p>
        <button className="back-button" onClick={() => (window.location.href = "/")}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default memo(ErrorPage);
