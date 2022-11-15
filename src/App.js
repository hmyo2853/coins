import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://api.coinpaprika.com/v1/tickers?quotes=KRW")
        .then((items) => {
          setCoins(items.data.slice(0, 100));
          setLoading(false);
        })
        .catch((error) => {
          console.log("error type : ", error);
          return null;
        });
    };
    getData();
  }, []);
  console.log(coins);
  return (
    <>
      <Text>{isLoading ? "loading...." : `${coins.length}`}</Text>
      <Container>
        {isLoading ? (
          <strong>Loading...</strong>
        ) : (
          <div>
            {coins.map((coin) => (
              <p>
                {coin.id} ({coin.symbol})
              </p>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

const Text = styled.div`
  display: flex;
  font-size: 2rem;
  font-weight: 600;
`;

const Container = styled.div``;

export default App;
