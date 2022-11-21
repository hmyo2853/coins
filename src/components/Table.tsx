import React from "react";
import styles from "./Table.module.css";

export default ({ children }: React.PropsWithChildren) => (
  <div className={styles.Table}>{children}</div>
);
