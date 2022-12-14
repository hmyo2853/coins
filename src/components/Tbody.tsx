import styles from "./Tbody.module.css";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../variables.css";

interface Props extends React.PropsWithChildren {
  rank: number;
  name: string;
  symbol: string;
  price: number;
  market_cap: number;
  market_cap_change_24h: number;
  volume_24h: number;
  percent_change_24h: number;
  percent_change_7d: number;
}

const Tbody: React.FC<Props> = ({
  rank,
  name,
  symbol,
  price,
  market_cap,
  market_cap_change_24h,
  volume_24h,
  percent_change_24h,
  percent_change_7d,
}) => {
  return (
    <div className={styles.Tbody}>
      <span>{rank}</span>
      <span>{name}</span>
      <span>{symbol}</span>
      <span>{price.toLocaleString("ko-KR")}원</span>
      <span>{market_cap.toLocaleString("ko-KR")}원</span>
      {market_cap_change_24h < 0 ? (
        <span style={{ color: "var(--color-blue)" }}>
          {market_cap_change_24h}% <FontAwesomeIcon icon={faCaretDown} />
        </span>
      ) : 0 < market_cap_change_24h ? (
        <span style={{ color: "var(--color-red)" }}>
          {market_cap_change_24h}% <FontAwesomeIcon icon={faCaretUp} />
        </span>
      ) : (
        <span>{market_cap_change_24h}%</span>
      )}

      <span>{volume_24h.toLocaleString("ko-KR")}</span>
      <span>{percent_change_24h.toFixed(2)}%</span>
      <span>{percent_change_7d.toFixed(2)}%</span>
    </div>
  );
};

export default Tbody;
