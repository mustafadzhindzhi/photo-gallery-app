import React from "react";
import style from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={style["navbar"]}>
      <div className={style["navbar-content"]}>
        <h2>PHOTO UPLOAD APP</h2>
        <p>More than 1000 photos</p>
      </div>
    </div>
  );
};

export default Navbar;
