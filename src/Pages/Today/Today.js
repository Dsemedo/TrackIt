import dayjs from "dayjs";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BASE_URL } from "../../constants/urls";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import Check from "../../Services/img/Check.png";
import TodayList from "./TodayList";
import colors from "../../constants/colors";

export default function Today({ habitDone, setHabitDone }) {
  const { Cinza, Verde } = colors;
  const navigate = useNavigate();
  const [todayHabits, setTodayHabits] = useState([]);
  const percentage = 66;

  console.log(todayHabits);

  dayjs.locale("pt-br");
  var now = dayjs().format("dddd, DD/MM");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const promise = axios.get(`${BASE_URL}/habits/today`, config);

    promise.then((res) => {
      setTodayHabits(res.data);
    });
  }, [habitDone]);

  return (
    <Container>
      <Header>
        <h1>TrackIt</h1>
        <img alt="foto de perfil" src={localStorage.getItem("image")} />
      </Header>
      <Content>
        <InfoDay>
          <span>{now}</span>

          {{ habitDone }.length === 0 ? (
            <h3 color={Cinza}>Nenhum hábito concluído ainda</h3>
          ) : (
            <h3 color={Verde}>{percentage}% dos hábitos concluídos</h3>
          )}
        </InfoDay>

        <TodayList todayHabits={todayHabits} setTodayHabits={setTodayHabits} />
      </Content>

      <Footer>
        <h1 onClick={() => navigate("/habitos")}>Hábitos</h1>
        {/* <ProgressBar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth="2px"
        /> */}

        <h1 onClick={() => navigate("/hoje")}>Hoje</h1>
        <h1 onClick={() => navigate("/historico")}>Histórico</h1>
      </Footer>
    </Container>
  );
}

// const ProgressBar = styled(CircularProgressbar)`
//   width: 90px;
//   height: 80px;
//   border: 1px solid red;
//   display: flex;

//   align-items: center;
// `;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e5e5e5;
`;

const Header = styled.div`
  top: 0;
  width: 100%;
  height: 10%;
  background-color: #126ba5;
  display: flex;
  align-items: center;

  h1 {
    margin-left: 5%;
    font-family: "Playball", cursive;
    font-size: 38px;
    color: white;
  }

  img {
    margin-left: 50%;
    width: 55px;
    height: 55px;
    border-radius: 98.5px;
  }
`;

const Content = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoDay = styled.div`
  margin-bottom: 5%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    margin: 5% 0 2% 0;
    font-family: "Lexend Deca", sans-serif;
    font-size: 23px;
    color: #126ba5;
    left: 0;
  }

  h3 {
    margin: 0 10px 0 25px;
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    color: ${(props) => props.color};
    margin: 0 0 5% 0;
  }
`;

const Footer = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 10%;
  border: 2px solid blue;
  display: flex;
  justify-content: space-around;
  align-items: center;

  h1 {
    color: #52b6ff;
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    cursor: pointer;
  }
`;
