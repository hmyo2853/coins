// @ts-check

import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAsync } from "react-async";
import React from "react";

/** 임시 데이터 */
import mockData from "./assets/data.json";

/** CSS */
import "./App.css";

/** 컴포넌트  */
// B -> Bold; 외부 컴포넌트 선언 대체
import Bold from "./components/Bold";
import Small from "./components/Small";
import Div from "./components/Div";
// TableDiv -> Table; 외부 컴포넌트 선언 대체
import Table from "./components/Table";
import Button from "./components/Button";
import Search from "./components/Search";

const DataLoader = function () {
	/** 데이터 가져오기 */
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

const App = function () {
	// const {
	// 	data,
	// 	isLoading,
	// 	error,
	// }: {
	// 	data: any;
	// 	isLoading: boolean;
	// 	error: any;
	// } = DataLoader();

	// Test Code
	const data = mockData;
	const isLoading = false;

	const [searchText, setSearchText] = useState("");
	const [isMouseOver, setRotate] = useState(false);

	const inputChangeText = (e: ChangeEvent) => {
		setSearchText(e.target.value.replace(" ", ""));
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
		<div className={appStyles.Container}>
			{isLoading ? <Bold>loading....</Bold> : null}
			{isLoading ? (
				<strong>Loading...</strong>
			) : (
				<>
					<Bold>암호화폐 TOP 100 리스트</Bold>
					<Search onChange={inputChangeText}></Search>
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
					<Div>
						<Table>
							<span>랭크</span>
							<span>종목</span>
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
								변동 <Small>지난 7일</Small>
							</span>
						</Table>
						{filterdData.length === 0 ? (
							<>없습니다</>
						) : (
							filterdData.map((items) => (
								<Table key={items.id}>
									<span>{items.rank}</span>
									<span>{items.name}</span>
									<span>{items.symbol}</span>
									<span>
										{Math.ceil(items.quotes.KRW.price).toLocaleString("ko-KR")}
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
									{Math.round(items.quotes.KRW.percent_change_24h) === 0 ? (
										<span>0%</span>
									) : (
										<span>
											{items.quotes.KRW.percent_change_24h.toFixed(2)}%
										</span>
									)}
									<span>{items.quotes.KRW.percent_change_7d.toFixed(2)}%</span>
								</Table>
							))
						)}
					</Div>
				</>
			)}
		</div>
	);
};

export default App;
