import React from "react";
//import {  ToggleButton, ButtonGroup } from "react-bootstrap";

const PreHeader = ({ count, size, totalUploads, totalApproved, onToggle ,totalUnsupported,totalUnderProcessing,totalDiscard}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3" style={{background:"lightgray"}}>
      <div>
        <strong>Count:</strong> {count}
      </div>
      {/* <ButtonGroup>
        <ToggleButton type="checkbox" variant="outline-primary" onChange={onToggle}>
          Toggle
        </ToggleButton>
      </ButtonGroup> */}
      <div>
        <strong>Size:</strong> {size}
      </div>
      <div>
        <strong>Total Uploads:</strong> {totalUploads}
      </div>
      <div>
        <strong>Total Approved:</strong> {totalApproved}
      </div>
      <div>
        <strong> Total UnderProcessing:</strong> {totalUnderProcessing}
      </div>
      <div>
        <strong>Total Unsupported:</strong> {totalUnsupported}
      </div>
      <div>
        <strong> Total Discard:</strong> {totalDiscard}
      </div>
    </div>
  );
};

export default PreHeader;
