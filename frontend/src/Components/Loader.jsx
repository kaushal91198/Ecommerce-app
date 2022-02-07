import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <div className = 'text-center'>
      <Spinner animation="border" role="status" variant="info">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
