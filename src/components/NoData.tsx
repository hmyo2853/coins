import styles from "./NoData.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => (
  <div className={styles.NoData}>
    <FontAwesomeIcon icon={faXmark} size="2x"></FontAwesomeIcon>
    <span>일치하는 항목이 없습니다.</span>
    <span>검색어를 확인해주세요.</span>
  </div>
);
