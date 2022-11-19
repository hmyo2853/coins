import React from "react";
import styles from "./Div.module.css";
export default ({ children }: React.PropsWithChildren) => (
	<div className={styles.Div}>{children}</div>
);
