import React, { memo } from "react";

interface NoResultsMessageProps {
  handleRefreshData: React.MouseEventHandler<HTMLButtonElement>;
}

const NoResultsMessage: React.FC<NoResultsMessageProps> = ({ handleRefreshData }) => {
  return (
    <div>
      <div className="no-results-message">No results found</div>
      <div>
        <p>Invalid filter applied. No results found.</p>
        <button className="export-button" onClick={handleRefreshData}>
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default memo(NoResultsMessage);
