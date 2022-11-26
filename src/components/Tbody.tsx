import styles from "./Tbody.module.css";

interface Props extends React.PropsWithChildren {
  rank: number;
  name: string;
  symbol: string;
  price: string;
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
      <span>{price}원</span>
      <span>{market_cap}원</span>
      <span>{market_cap_change_24h}%</span>
      <span>{volume_24h}%</span>
      <span>{percent_change_24h}%</span>
      <span>{percent_change_7d}%</span>
    </div>
  );
};

export default Tbody;
