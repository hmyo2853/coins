// @ts-check

/**
 * React Query 참조
 * @link https://kyounghwan01.github.io/blog/React/react-query/basic/#usequery
 *
 * CSS; Flex 이해하기
 * @link https://studiomeal.com/archives/197
 */

import { ChangeEvent, useState } from "react";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** CSS */
import "./App.css";

/** 컴포넌트  */
// B -> Bold; 외부 컴포넌트 선언 대체
import Bold from "./components/Bold";
import Small from "./components/Small";
import TableRow from "./components/TableRow";
// TableDiv -> Table; 외부 컴포넌트 선언 대체
import Table from "./components/Table";
import Button from "./components/Button";
import Search from "./components/Search";
import { CoinPaprika } from "./coinpaprika";
import { useQuery } from "react-query";

const App = function () {
	/** 데이터 가져오기 */
	const getData = async (): Promise<CoinPaprika[]> => {
		const _fetch = await fetch(import.meta.env.VITE_REQUEST_URL);

		if (!_fetch.ok)
			throw new Error(`HTTP Error: status code is ${_fetch.status}.`);

		return _fetch.json();
	};

	const [searchText, setSearchText] = useState("");
	const [isMouseOver, setRotate] = useState(false);

	const { data, isLoading, isError, error, refetch } = useQuery(
		"coins",
		getData
	);

	const inputChangeText = (e: ChangeEvent) => {
		setSearchText((e.target as HTMLInputElement).value.replace(" ", ""));
	};

	/** state 변경되면서 리랜더링 */
	const onRefresh = () => refetch();

	/** 검색어가 없는 경우, 검색어가 매칭되는 경우 필터링 */
	const filterData = (data: CoinPaprika[] | undefined) =>
		data?.filter(
			(v) => !searchText || new RegExp(searchText, "i").test(v.name)
		);

	if (isError)
		return (
			<>
				<strong>Unable to load data.</strong>
				{(error as Error).message}
			</>
		);

	if (isLoading) return <strong>Loading...</strong>;

	return (
		<>
			<header>
				<h2>암호화폐 TOP 100 리스트</h2>
				<div>
					<Search onChange={inputChangeText}></Search>{" "}
					<Button
						onClick={onRefresh}
						onMouseOut={() => {
							setRotate(false);
						}}
						onMouseOver={() => {
							setRotate(true);
						}}
					>
						<FontAwesomeIcon
							icon={faArrowsRotate}
							className={isMouseOver ? "fa-spin" : ""}
						/>
					</Button>
				</div>
			</header>

			<br />
			<br />

			<Table>
				<TableRow>
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
				</TableRow>
				{(() => {
					if (isError) {
						return (
							<div className="block">
								<span>오류가 발생했습니다</span>
								<br />
								{(error as Error).message}
							</div>
						);
					}

					const _data = filterData(data as CoinPaprika[]);

					if (!_data || _data?.length === 0)
						return <div className="block">결과 없음.</div>;

					return (
						_data?.map((items) => (
							<TableRow key={items.id}>
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
								{Math.round(items.quotes.KRW.percent_change_24h) === 0 ? (
									<span>0%</span>
								) : (
									<span>{items.quotes.KRW.percent_change_24h.toFixed(2)}%</span>
								)}
								<span>{items.quotes.KRW.percent_change_7d.toFixed(2)}%</span>
							</TableRow>
						)) || <TableRow></TableRow>
					);
				})()}
			</Table>
		</>
	);
};

export default App;
