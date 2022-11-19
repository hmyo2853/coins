import React, { MouseEventHandler } from "react";
import styles from "./Button.module.css";

interface Props extends React.PropsWithChildren {
	onClick: MouseEventHandler<HTMLButtonElement>;
	onMouseOut: MouseEventHandler<HTMLButtonElement>;
	onMouseOver: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<Props> = ({
	children,
	onClick,
	onMouseOut,
	onMouseOver,
}) => {
	return (
		<button
			className={styles.Button}
			onClick={onClick}
			onMouseOut={onMouseOut}
			onMouseOver={onMouseOver}
		>
			{children}
		</button>
	);
};

export default Button;
