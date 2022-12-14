import React from "react";
import styles from "./Search.module.css";
import { ChangeEvent } from "react";

const Search: React.FC<{
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ placeholder, maxLength, minLength, onChange }) => (
  <input
    className={styles.Search}
    type="text"
    placeholder={placeholder || "검색어 입력"}
    maxLength={maxLength || 50}
    minLength={minLength || 1}
    onChange={onChange}
  ></input>
);

export default Search;
