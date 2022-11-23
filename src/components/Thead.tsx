import styles from "./Thead.module.css";

interface Props extends React.PropsWithChildren {
  rank: string;
  name: string;
  symbol: string;
  price: string;
  market_cap: string;
  market_cap_change_24h: string;
  volume_24h: string;
  percent_change_24h: string;
  percent_change_7d: string;
}

const Thead: React.FC<Props> = ({
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
    <div className={styles.Thead}>
      <span>{rank}</span>
      <span>{name}</span>
      <span>{symbol}</span>
      <span>{price}</span>
      <span>{market_cap}</span>
      <span>{market_cap_change_24h}</span>
      <span>{volume_24h}</span>
      <span>{percent_change_24h}</span>
      <span>{percent_change_7d}</span>
    </div>
  );
};

export default Thead;
