import React from "react";
import styles from "@styles/Home.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      Made with ☕ by &nbsp;
      <a
        href="https://twitter.com/AllDevThings"
        target="_blank"
        rel="noreferrer noopener"
        className="w-auto inline-block underline"
      >
        Shimanta
      </a>
    </footer>
  );
};
