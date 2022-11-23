import React from "react";
import styles from "./TableRow.module.css";

const TableRow = ({ children }: React.PropsWithChildren) => {
	return <div className={styles.TableRow}>{children}</div>;
};

export default TableRow;
