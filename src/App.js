import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setDatas] = useState([]);
  const [searchText, setSearchText] = useState("");

  const inputChangeText = (e) => {
    setSearchText(e.target.value.replace(/ /g, ""));
  };

  const onRefresh = () => {
    window.location.reload();
  };
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
            <Search onChange={inputChangeText}></Search>
            <Button onClick={onRefresh}>Refresh</Button>
            <DivWrap>
              <TableDiv>
                <LankDiv>랭크</LankDiv>
                <NameDiv>종목</NameDiv>
                <SymbolDiv>기호</SymbolDiv>
                <PriceDiv>
                  현재 시세 <Small>KRW</Small>
                </PriceDiv>
                <CapDiv>시가총액</CapDiv>
                <Cap24Div>
                  가격변동률 <Small>지난 24H</Small>
                </Cap24Div>
                <VolumDiv>
                  거래량 <Small>지난 24H</Small>
                </VolumDiv>
                <Change24Div>
                  변동 <Small>지난 24H</Small>
                </Change24Div>
                <Change7Div>
                  변동 <Small>지난 7일</Small>
                </Change7Div>
              </TableDiv>
              {data
                .filter((items) => {
                  if (
                    items.name.toLowerCase().includes(searchText.toLowerCase())
                  ) {
                    return items;
                  }
                })
                .map((items) => (
                  <TableDiv key={items.id}>
                    <LankDiv>{items.rank}</LankDiv>
                    <NameDiv>{items.name}</NameDiv>
                    <SymbolDiv>{items.symbol}</SymbolDiv>
                    <PriceDiv>
                      {Math.ceil(items.quotes.KRW.price).toLocaleString(
                        "ko-KR"
                      )}
                      원
                    </PriceDiv>
                    <CapDiv>
                      {Math.ceil(items.quotes.KRW.market_cap).toLocaleString(
                        "ko-KR"
                      )}
                      원
                    </CapDiv>
                    <Cap24Div>
                      {items.quotes.KRW.market_cap_change_24h}%
                    </Cap24Div>
                    <VolumDiv>
                      {Math.ceil(items.quotes.KRW.volume_24h)}
                    </VolumDiv>
                    {items.quotes.KRW.percent_change_24h.toFixed(2) === 0 ? (
                      <Change24Div>0%</Change24Div>
                    ) : (
                      <Change24Div>
                        {items.quotes.KRW.percent_change_24h.toFixed(2)}%
                      </Change24Div>
                    )}
                    <Change7Div>
                      {items.quotes.KRW.percent_change_7d.toFixed(2)}%
                    </Change7Div>
                  </TableDiv>
                ))}
            </DivWrap>
          </>
        )}
      </Container>
    </>
  );
}

const B = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const Small = styled.span`
  font-size: 0.6rem;
  color: gray;
`;

const Container = styled.div``;

const DivWrap = styled.div`
  border: 1px solid black;
  border-spacing: 0px;
`;

const TableDiv = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  grid-template-columns: auto;
`;

const LankDiv = styled.div``;

const NameDiv = styled.div``;

const SymbolDiv = styled.div``;

const PriceDiv = styled.div``;

const CapDiv = styled.div``;

const Cap24Div = styled.div``;

const VolumDiv = styled.div``;

const Change24Div = styled.div``;

const Change7Div = styled.div``;

const Search = styled.input.attrs({
  placeholder: "종목을 입력해주세요.",
  type: "text",
  minLength: "1",
  maxLength: "50",
})`
  background-color: #f5f5f5;
  color: black;
  width: 320px;
  padding: 16px 12px;
  border-radius: 12px;
  border: 1px solid #f5f5f5;
  &:focus {
    outline: none;
    border: 1px solid red;
  }
`;

const Button = styled.button``;

export default App;
