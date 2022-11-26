import { ChangeEvent, useState, useEffect } from "react";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./App.css";

import Bold from "./components/Bold";
import Button from "./components/Button";
import Search from "./components/Search";
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

  // 새로고침
  const onRefresh = (): void => {
    window.location.reload();
    return;
  };

  // filter를 이용해서 data를 items로 가져오는 함수
  const filterData = (data: CoinPaprika[] | null) =>
    data?.filter((items) => {
      if (items.name.toLowerCase().includes(searchText.toLocaleLowerCase())) {
        return items;
      }
    });

  // mapping 될 filter data
  const _filter = filterData(data as CoinPaprika[]);

  useEffect(() => {
    getData() //slice
      .then((e) => {
        setData(e || []);
        setLoading(false);
      });
  }, []);

  // isLoading true일때 return
  if (isLoading) return <strong>Loading...</strong>;

  // isLoading true 이외 일때 (false)
  return (
    <>
      <Bold>암호화폐 TOP 100 리스트</Bold>
      <div>
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
        <select>
          <option value="none" defaultValue="default">
            선택
          </option>
          <option value="rank">랭크</option>
          <option value="name">종목</option>
          <option value="symbol">기호</option>
          <option value="price">현재 시세 KRW</option>
          <option value="market_cap">시가 총액</option>
          <option value="market_cap_change_24h">지난 24H 가격변동률</option>
          <option value="volume_24h">지난 24H 거래량</option>
          <option value="percent_change_24h">지난 24H 변동</option>
          <option value="percent_change_7d">지난 7일 거래량</option>
        </select>
      </div>
      <>
        <Thead
          rank="랭크"
          name="종목"
          symbol="기호"
          price="현재 시세"
          krw="KRW"
          market_cap="시가 총액"
          market_cap_change_24h="가격변동률"
          m_time="지난 24H"
          volume_24h="거래량"
          v_time="지난 24H"
          percent_change_24h="변동"
          p_24_time="지난 24H"
          percent_change_7d="거래량"
          p_7d_time="지난 7일"
        ></Thead>
        {
          // 검색 data가 없음
          !_filter || _filter?.length === 0 ? (
            <div>결과 없음</div>
          ) : (
            // 검색 data가 있음, mapping
            _filter?.map((items) => (
              <Tbody
                rank={items.rank}
                name={items.name}
                symbol={items.symbol}
                price={Math.ceil(items.quotes.KRW.price)}
                market_cap={Math.ceil(items.quotes.KRW.market_cap)}
                market_cap_change_24h={items.quotes.KRW.market_cap_change_24h}
                volume_24h={Math.ceil(items.quotes.KRW.volume_24h)}
                percent_change_24h={items.quotes.KRW.percent_change_24h}
                percent_change_7d={items.quotes.KRW.percent_change_7d}
              ></Tbody>
            ))
          )
        }
      </>
    </>
  );
};

export default App;
