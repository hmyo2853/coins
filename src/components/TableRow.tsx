import React from "react";
import styles from "./TableRow.module.css";

export default ({ children }: React.PropsWithChildren) => (
  <div className={styles.TableRow}>{children}</div>
);
