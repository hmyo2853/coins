import Small from "./Small";
import styles from "./Thead.module.css";

interface Props extends React.PropsWithChildren {
  rank: string;
  name: string;
  symbol: string;
  price: string;
  krw: string;
  market_cap: string;
  market_cap_change_24h: string;
  m_time: string;
  volume_24h: string;
  v_time: string;
  percent_change_24h: string;
  p_24_time: string;
  percent_change_7d: string;
  p_7d_time: string;
}

const Thead: React.FC<Props> = ({
  rank,
  name,
  symbol,
  price,
  krw,
  market_cap,
  market_cap_change_24h,
  m_time,
  volume_24h,
  v_time,
  percent_change_24h,
  p_24_time,
  percent_change_7d,
  p_7d_time,
}) => {
  return (
    <div className={styles.Thead}>
      <span>{rank}</span>
      <span>{name}</span>
      <span>{symbol}</span>
      <span>
        {price}
        <Small>{krw}</Small>
      </span>
      <span>{market_cap}</span>
      <span>
        {market_cap_change_24h}
        <Small>{m_time}</Small>
      </span>
      <span>
        {volume_24h}
        <Small>{v_time}</Small>
      </span>
      <span>
        {percent_change_24h}
        <Small>{p_24_time}</Small>
      </span>
      <span>
        {percent_change_7d}
        <Small>{p_7d_time}</Small>
      </span>
    </div>
  );
};

export default Thead;
