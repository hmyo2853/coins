import { ChangeEvent, useState, useEffect } from "react";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./App.css";

import Bold from "./components/Bold";
import Small from "./components/Small";
import Button from "./components/Button";
import Search from "./components/Search";
import Div from "./components/Div";
import Table from "./components/Table";
import Thead from "./components/Thead";
import Tbody from "./components/Tbody";
import { CoinPaprika } from "./coinpaprika";

// const API_URL = "src/assets/data.json";
const API_URL = "https://api.coinpaprika.com/v1/tickers?quotes=KRW";

const App = () => {
  const [data, setData] = useState<CoinPaprika[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isMouseOver, setRotate] = useState<boolean>(false);

  // input 값에 따라 변경되는 state 선언
  const inputChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value.replace(" ", ""));
  };

  // 데이터 가져오기
  const getData = async (): Promise<CoinPaprika[] | void> => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      const slice = json.slice(0, 100) as CoinPaprika[];
      return slice;
    } catch (e) {
      // arror type
      console.log((e as Error).message);
    }
  };

  const onRefresh = (): void => {
    window.location.reload();
    return;
  };

  // 검색어가 없는, 있는 경우의 필터 처리
  // const filterdData: CoinPaprika[] = data?.filter((items) => {
  //   if (items.name.toLowerCase().includes(searchText.toLowerCase())) {
  //     return items;
  //   }
  // });

  const filterData = (data: CoinPaprika[] | null) =>
    data?.filter((items) => {
      items.name.toLowerCase().includes(searchText.toLocaleLowerCase());
      return items;
    });

  useEffect(() => {
    getData() //slice
      .then((e) => {
        setData(e || []);
        setLoading(false);
      });
  }, []);

  // isLoading true일때 return
  if (isLoading) return <strong>Loading...</strong>;

  return (
    <>
      <Bold>암호화폐 TOP 100 리스트</Bold>
      <Search onChange={inputChangeText}></Search>
      <Button
        onClick={onRefresh}
        onMouseOver={() => {
          setRotate(true);
        }}
        onMouseOut={() => {
          setRotate(false);
        }}
      >
        <FontAwesomeIcon
          icon={faArrowsRotate}
          className={isMouseOver ? "fa-spin" : ""}
        ></FontAwesomeIcon>
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
          {() => {
            const _filter = filterData(data as CoinPaprika[]);

            // 검색 data가 없음
            if (!_filter || _filter?.length === 0) {
              return <div>결과 없음</div>;
            }

            // 검색 data가 있음, mapping
            return _filter?.map((items) => {
              <>
                <span>{items.rank}</span>
                <span>{items.name}</span>
                <span>{items.symbol}</span>
                <span>
                  {Math.ceil(items.quotes.KRW.price).toLocaleString("ko-KR")}원
                </span>
                <span>
                  {Math.ceil(items.quotes.KRW.market_cap).toLocaleString(
                    "ko-KR"
                  )}
                  원
                </span>
                <span>{items.quotes.KRW.market_cap_change_24h}%</span>
                <span>{Math.ceil(items.quotes.KRW.volume_24h)}</span>
                <span>{items.quotes.KRW.percent_change_24h.toFixed(2)}%</span>
                <span>{items.quotes.KRW.percent_change_7d.toFixed(2)}%</span>
              </>;
            });
          }}
        </Table>
      </Div>
    </>
  );
};

export default App;
