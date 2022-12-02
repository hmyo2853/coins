# Toy Project - Coins Top 100 List

<img src="https://github.com/hmyo2853/coins/blob/main/coverimg_coins.PNG?raw=true" width="100%" alt="coverimg_coins.PNG"/>

<br>

## 토이 프로젝트 진행 목적

- ReactJs로 코드 작성 후, React Typescript로 코드 리팩토링 진행
- 컴포넌트 모듈화
- async, await로 비동기 프로그래밍 코드 작성
- styled-components 사용
- grid를 사용한 table ui 구현
- vite로 create, dev(test)
- github page가 아닌 vercel 로 배포
- React Query 사용

<br>

## 최종 구현 화면

- [vercel - https://coins-hmyo2853.vercel.app/](https://coins-hmyo2853.vercel.app/)

<br>

## 구현 요구 사항 목록

- [O] React Query로 coinpaprika API 연동
- [O] 로딩 페이지, 필터된 항목 없을때 페이지 컴포넌트 구현
- [O] (step 1) 검색시 검색 키워드(`id, name :string`)에 따라 리스트 출력
- [   ] (step 2) 검색시 검색 키워드(`rank, price , ...:number`)에 따라 리스트 출력
- [   ] (step 3) 검색시 특정 검색 키워드(`price, market_cap, ...:number`)에 따라 근사치로 리스트 출력
- [O] 심플하고 가독성이 높은 UI 컴포넌트 구성


<br>

## 사용한 프레임워크 및 라이브러리 설명

- React: 컴포넌트 기반의 화면구성, Virtual DOM으로 인한 속도 향상, SPA(싱글 페이지 애플리케이션)
- TypeScript: 초기 데이터와 컴포넌트 사이에 전달되는 데이터의 컴파일 오류를 방지하기 위해 사용
- React-Query: 데이터 패칭시 로딩, 에러 state 관리를 쉽게 하기 위해 사용
- styled-components: CSS-in-JS, 컴포넌트 단위로 CSS를 관리하기 위해 사용
- Vite: build 속도를 빠르게 하기 위해 사용
