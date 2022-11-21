import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAsync } from "react-async";

import mockData from "./assets/data.json";

import "./App.css";

import Bold from "./components/Bold";
import Small from "./components/Small";
import Button from "./components/Button";
import Search from "./components/Search";
import Div from "./components/Div";
import Table from "./components/Table";

const DataLoader = () => {
  const getData = async () => {
    const _fetch = await fetch(
      `https://api.coinpaprika.com/v1/tickers?quotes=KRW`
    );
    return await _fetch.json();
  };
  return useAsync({
    promiseFn: getData,
  });
};

const App = () => {
  const data = mockData;
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isMouseOver, setRotate] = useState(false);

  const inputChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value.replace(" ", ""));
  };

  const onRefresh = () => {
    window.location.reload();
  };

  const filterdData = data.filter((items) => {
    if (items.name.toLowerCase().includes(searchText.toLowerCase())) {
      return items;
    }
  });

  return (
    <>
      {isLoading ? (
        <strong>Loading....</strong>
      ) : (
        <>
          <Bold>암호화폐 TOP 100 리스트</Bold>
          <Search onChange={inputChangeText}></Search>
          <Button
            onClick={onRefresh}
            onMouseOver={() => {
              setRotate(false);
            }}
            onMouseOut={() => {
              setRotate(true);
            }}
          >
            {isMouseOver ? (
              <FontAwesomeIcon icon={faArrowsRotate}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faArrowsRotate}
                className="fa-spin"
              ></FontAwesomeIcon>
            )}
          </Button>
          <Div>
            <Table>
              <span>랭크</span>
              <span>목록</span>
              <span>기호</span>
              <span>
                현재 시세 <Small>KRW</Small>
              </span>
              <span>시가총액</span>
              <span>
                가격변동률 <Small>지난 24H</Small>
              </span>
              <span>
                거래량 <Small>지난 24H</Small>
              </span>
              <span>
                변동 <Small>지난 24H</Small>
              </span>
              <span>
                거래량 <Small>지난 7일</Small>
              </span>
              {filterdData.length === 0 ? (
                <>검색 항목과 일치하는 종목이 없습니다.</>
              ) : (
                filterdData.map((items) => (
                  <Table key={items.id}>
                    <span>{items.rank}</span>
                    <span>{items.name}</span>
                    <span>{items.symbol}</span>
                    <span>
                      {Math.ceil(items.quotes.KRW.price).toLocaleString(
                        "ko-KR"
                      )}
                      원
                    </span>
                    <span>
                      {Math.ceil(items.quotes.KRW.market_cap).toLocaleString(
                        "ko-KR"
                      )}
                      원
                    </span>
                    <span>{items.quotes.KRW.market_cap_change_24h}%</span>
                    <span>{Math.ceil(items.quotes.KRW.volume_24h)}</span>
                    <span>
                      {items.quotes.KRW.percent_change_24h.toFixed(2)}%
                    </span>
                    <span>
                      {items.quotes.KRW.percent_change_7d.toFixed(2)}%
                    </span>
                  </Table>
                ))
              )}
            </Table>
          </Div>
        </>
      )}
    </>
  );
};

export default App;
