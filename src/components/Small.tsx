import React from "react";
import style from "./Small.module.css";

export default ({ children }: React.PropsWithChildren) => (
  <span className={style.Small}>{children}</span>
);
