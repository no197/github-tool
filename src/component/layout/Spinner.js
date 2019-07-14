import React, { Fragment } from "react";
import SpinnerGif from "./spinner.gif";
const Spinner = props => {
  return (
    <Fragment>
      <img src={SpinnerGif} alt="loading..." style={spinnerStyle} />
    </Fragment>
  );
};

const spinnerStyle = {
  width: "200px",
  margin: "auto",
  display: "block",
};
export default Spinner;
