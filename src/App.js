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
      <Container>
        {isLoading ? <B>loading....</B> : null}
        {isLoading ? (
          <strong>Loading...</strong>
        ) : (
          <>
            <B>암호화폐 TOP 100 리스트</B>
            <form>
              <Search></Search>
              <SubmitButton>Submit</SubmitButton>
            </form>
            <Table>
              <Thead>
                <Tr>
                  <Td>랭크</Td>
                  <Td>종목</Td>
                  <Td>기호</Td>
                  <Td>현재 시세(KRW)</Td>
                  <Td>시가총액</Td>
                  <Td>시가 가격변동률 (지난 24H)</Td>
                  <Td>거래량 (지난 24H)</Td>
                  <Td>변동 (지난 24H)</Td>
                  <Td>변동 (지난 7일)</Td>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((items) => (
                  <Tr key={items.id}>
                    <Td>{items.rank}</Td>
                    <Td>{items.name}</Td>
                    <Td>{items.symbol}</Td>
                    <Td>
                      {Math.ceil(items.quotes.KRW.price).toLocaleString(
                        "ko-KR"
                      )}
                      원
                    </Td>
                    <Td>
                      {Math.ceil(items.quotes.KRW.market_cap).toLocaleString(
                        "ko-KR"
                      )}
                      원
                    </Td>
                    <Td>{items.quotes.KRW.market_cap_change_24h}%</Td>
                    <Td>{items.quotes.KRW.volume_24h.toFixed(2)}</Td>
                    {items.quotes.KRW.percent_change_24h.toFixed(2) == 0 ? (
                      <Td>0%</Td>
                    ) : (
                      <Td>{items.quotes.KRW.percent_change_24h.toFixed(2)}</Td>
                    )}
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

const B = styled.div`
  display: flex;
  font-size: 2rem;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

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
const Search = styled.input.attrs({
  type: "text",
  minLength: "1",
  maxLength: "50",
})`
  background-color: black;
  color: white;
  width: 320px;
  padding: 16px 12px;
  border: 0px;
  border-radius: 12px;
`;

const SubmitButton = styled.button``;

export default App;
