import { ChangeEvent, useState } from "react";
import styled from "styled-components";

import mockData from "./assets/data.json";

import "./App.css";

import Bold from "./components/Bold";
import Small from "./components/Small";
import Button from "./components/Button";
import Search from "./components/Search";
import Div from "./components/Div";
import Table from "./components/Table";

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
          {isMouseOver ? <>버튼 오버</> : <>버튼</>}
        </Button>
        <Table>mapping된 데이터 내용</Table>
      </Div>
    </>
  );
}

export default App;
