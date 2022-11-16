import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setDatas] = useState([]);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const API_KEY = process.env.MOVE_PRIVATE_API_KEY;
  const getData = async (day) => {
    await axios
      .get(
        "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json",
        {
          params: {
            key: API_KEY,
            targetDt: day,
          },
        }
      )
      .then((response) => {
        setTitle(response.data.boxOfficeResult.boxofficeType);
        setDatas(response.data.boxOfficeResult.dailyBoxOfficeList);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error type : ", error.response);
        return null;
      });
  };
  console.log(data);
  useEffect(() => {
    const date = new Date();
    setDay(
      new Date(date.setDate(date.getDate() - 1))
        .toLocaleDateString()
        .split(/\.|\s/)
        .join("")
    );
    getData(day);
  }, []);
  return (
    <>
      <Text>{isLoading ? "loading...." : `${title} TOP ${data.length}`}</Text>
      <Container>{isLoading ? <strong>Loading...</strong> : null}</Container>
    </>
  );
}

const Text = styled.div`
  display: flex;
  font-size: 2rem;
  font-weight: 600;
`;

const Container = styled.div``;

export default App;
