import React from "react";
import Styles from "./presentational.css";

const Spinner = () => (
  <div className={Styles.SpinnerDiv}>
    <img className={Styles.SpinnerImage} src="assets/loading.gif" />
  </div>
);

export default Spinner;
