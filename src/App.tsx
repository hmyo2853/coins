// @ts-Check

import React, { ChangeEvent, useState, useEffect } from "react";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./App.css";

/** 컴포넌트 */
import Bold from "./components/Bold";
import Button from "./components/Button";
import Search from "./components/Search";
import Thead from "./components/Thead";
import Tbody from "./components/Tbody";
import { CoinPaprika } from "./coinpaprika";
import NoData from "./components/NoData";
import { useQuery } from "react-query";

const MOCK_DATA = "src/assets/data.json";
const API_URL = "https://api.coinpaprika.com/v1/tickers?quotes=KRW";

const App = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isMouseOver, setRotate] = useState<boolean>(false);
  const [isSelectOption, setSelectOption] = useState<string>("");

  /** 데이터 가져오기 */
  const getData = (): Promise<CoinPaprika[] | void> => {
    return fetch(API_URL).then(async (_res) => {
      if (!_res.ok)
        throw new Error(`HTTP Error : status code is ${_res.status}`);
      const json = await _res.json();
      const slice = json.slice(0, 100) as CoinPaprika[];
      return slice;
    });
  };

  /** useQuery */
  const { data, isLoading, isError, error, refetch } = useQuery(
    "coins", // 임의로 설정하는 queryKey
    getData
  );
  /** input 값에 따라 변경되는 state 선언 */
  const inputChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value.replace(" ", ""));
  };

  // option 선택시 필터 선택
  const selectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectOption(e.currentTarget.value);
  };

  /** 새로고침 */
  const onRefresh = () => refetch();

  /** 데이터가 있을 경우 조건에 맞는 데이터 필더링 */
  const filterData = (data: CoinPaprika[] | null) =>
    data?.filter((items) => {
      if (
        items[isSelectOption]
          .toLowerCase()
          .includes(searchText.toLocaleLowerCase())
      ) {
        return items;
      }
    });

  /** 필터된 데이터 set */
  const _filter = filterData(data as CoinPaprika[]);

  // isLoading true일때 return
  if (isLoading) return <strong>Loading...</strong>;

  // state error 일때 에러 처리
  if (isError)
    return <strong>${(error as Error).message} :: Unable to load data.</strong>;

  // isLoading true 이외 일때 (false)
  return (
    <>
      <Bold>암호화폐 TOP 100 리스트</Bold>
      <div>
        <select onChange={selectChange} defaultValue="name">
          <option value="name">종목</option>
          <option value="symbol">기호</option>
        </select>
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
          percent_change_24h="증감률"
          p_24_time="지난 24H"
          percent_change_7d="거래량"
          p_7d_time="지난 7일"
        ></Thead>
        {!_filter || _filter?.length === 0 ? (
          <NoData />
        ) : (
          _filter?.map((items) => (
            <div key={items.id}>
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
            </div>
          ))
        )}
      </>
    </>
  );
};

export default App;
