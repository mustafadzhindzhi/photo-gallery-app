import React from "react";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={style["footer"]}>
      <p>PHOTO UPLOAD APP</p>
      <div className={style["footer-copyright"]}>
        <hr />
        <p>Copyright @ 2024 - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
