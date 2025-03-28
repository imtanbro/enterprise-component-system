import React from "react";

const Loader: React.FC = () => {
  console.log("Loader Component Rendered");

  return (
    <div className="loader">
      Loading...
      {/* You can replace this with an actual spinner or animated loader */}
    </div>
  );
};

export default Loader;
