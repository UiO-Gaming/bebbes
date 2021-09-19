import React from "react";
import styles from "./footer.module.css";

const Footer = () => (
  <footer className={styles.container}>
    <p>
      Laget av <a href="https://uiogaming.no">UiO Gaming</a>
    </p>
    <p>
      Inspirert av FPU sin{" "}
      <a href="https://www.fpu.no/common/pizza/">pizzakalkulator</a>
    </p>
  </footer>
);

export default Footer;
