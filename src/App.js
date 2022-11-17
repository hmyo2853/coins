import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setDatas] = useState([]);

  const getData = async () => {
    await axios
      .get("data/data.json")
      .then((items) => {
        setDatas(items.data.slice(0, 100));
        setLoading(false);
      })
      .catch((error) => {
        console.log("error type : ", error);
        return null;
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Text>{isLoading ? "loading...." : null}</Text>
      <Container>
        {isLoading ? (
          <strong>Loading...</strong>
        ) : (
          <>
            <Table>
              <Thead>
                <Tr>
                  <Td>랭크</Td>
                  <Td>종목</Td>
                  <Td>기호</Td>
                  <Td>현재 시세(KRW)</Td>
                  <Td>총 시가</Td>
                  <Td>시가 가격변동률 24H</Td>
                  <Td>거래량 24H</Td>
                  <Td>변동 24H</Td>
                  <Td>변동 7D</Td>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((items) => (
                  <Tr key={items.id}>
                    <Td>{items.rank}</Td>
                    <Td>{items.name}</Td>
                    <Td>{items.symbol}</Td>
                    <Td>{items.quotes.KRW.price}</Td>
                    <Td>{items.quotes.KRW.market_cap}</Td>
                    <Td>{items.quotes.KRW.market_cap_change_24h}%</Td>
                    <Td>
                      {(items.quotes.KRW.volume_24h / 1000000000000).toFixed(2)}
                      T
                    </Td>
                    <Td>{items.quotes.KRW.percent_change_24h.toFixed(2)}%</Td>
                    <Td>{items.quotes.KRW.percent_change_7d.toFixed(2)}%</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
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

const Table = styled.table`
  border: 1px solid black;
  border-spacing: 0px;
`;

const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Td = styled.td`
  border: 1px solid black;
  border-spacing: 0px;
`;
const Tr = styled.tr``;
export default App;
