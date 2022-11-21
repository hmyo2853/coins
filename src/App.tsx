import { useState } from "react";
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

function App() {
  const [isMouseOver, setRotate] = useState(false);

  const onRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Bold>TITLE</Bold>
      <Div>
        <Small>Small 글씨</Small>
        <Search></Search>
        <Button
          onClick={onRefresh}
          onMouseOut={() => {
            setRotate(false);
          }}
          onMouseOver={() => {
            setRotate(true);
          }}
        >
          {isMouseOver ? (
            <FontAwesomeIcon icon={faArrowsRotate} className="fa-spin" />
          ) : (
            <FontAwesomeIcon icon={faArrowsRotate} />
          )}
        </Button>
        <Table>mapping된 데이터 내용</Table>
      </Div>
    </>
  );
}

export default App;
