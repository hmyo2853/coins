import React from "react";
import styles from "./Small.module.css";
export default ({ children }: React.PropsWithChildren) => (
	<span className={styles.Small}>{children}</span>
);
