import React from "react";
import styles from "./Bold.module.css";

export default ({ children }: React.PropsWithChildren) => (
  <span className={styles.Bold}>{children}</span>
);
