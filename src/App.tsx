import { ChangeEvent, useState, useEffect } from "react";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "react-async";

import mockData from "./assets/data.json";

import "./App.css";

import Bold from "./components/Bold";
import Small from "./components/Small";
import Button from "./components/Button";
import Search from "./components/Search";
import Div from "./components/Div";
import Table from "./components/Table";
import Thead from "./components/Thead";

const API_URL = "./assets/data.json";

// const getData = async () => {
//   await axios
//     .get("data/data.json")
//     .then((items) => {
//       setDatas(items.data.slice(0, 100));
//       setLoading(false);
//     })
//     .catch((error) => {
//       console.log("error type : ", error);
//       return null;
//     });
// };

const App = () => {
  const [data, setData] = useState([]);
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

  const fetchData = async () => {
    try {
      const response = await fetch("src/assets/data.json");
      const json = await response.json();
      setData(json.slice(0, 100));
    } catch (error) {
      console.log("type : ", error);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              <Thead
                rank="랭크"
                name="종목"
                symbol="기호"
                price="현재 시세 KRW"
                market_cap="시가 총액"
                market_cap_change_24h="지난 24H 가격변동률"
                volume_24h="지난 24H 거래량"
                percent_change_24h="지난 24H 변동"
                percent_change_7d="지난 7일 거래량"
              ></Thead>
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
