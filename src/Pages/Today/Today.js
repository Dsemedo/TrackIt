import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/urls";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TodayList from "./TodayList";

export default function Today({
  habitDone,
  setHabitDone,
  setTodayHabits,
  todayHabits,
}) {
  const navigate = useNavigate();

  const percentage = ((habitDone.length / todayHabits.length) * 100).toFixed(2);
  var now = dayjs().locale("pt-br").format("dddd, DD/MM");

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
  }, [setTodayHabits]);

  return (
    <Container>
      <Header>
        <h1>TrackIt</h1>
        <img alt="foto de perfil" src={localStorage.getItem("image")} />
      </Header>
      <Content>
        <InfoDay>
          <h1>{now}</h1>

          {habitDone.length === 0 ? (
            <p>Nenhum hábito concluído ainda</p>
          ) : (
            <span>{percentage}% dos hábitos concluídos</span>
          )}
        </InfoDay>

        <TodayList
          key={todayHabits.length}
          habitDone={habitDone}
          setHabitDone={setHabitDone}
          todayHabits={todayHabits}
          setTodayHabits={setTodayHabits}
        />
      </Content>

      <Footer>
        <h1 onClick={() => navigate("/habitos")}>Hábitos</h1>
        <div onClick={() => navigate("/hoje")}>
          <Barra
            value={percentage}
            text="Hoje"
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#3e98c7",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent",
            })}
          />
        </div>
        <h1 onClick={() => navigate("/historico")}>Histórico</h1>
      </Footer>
    </Container>
  );
}

const Barra = styled(CircularProgressbar)`
  width: 120px;
  height: 110px;
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  z-index: 1;
  cursor: pointer;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e5e5e5;
`;

const Content = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 70px;
`;

const InfoDay = styled.div`
  margin-bottom: 5%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    margin: 5% 0 2% 0;
    font-family: "Lexend Deca", sans-serif;
    font-size: 23px;
    color: #126ba5;
    left: 0;
  }

  p {
    margin: 0 10px 0 25px;
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    color: #bababa;
    margin: 0 0 5% 0;
  }

  span {
    margin: 0 10px 0 25px;
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    color: #8fc549;
    margin: 0 0 5% 0;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  top: 0px;
  background: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  position: fixed;

  h1 {
    margin-left: 5%;
    font-family: "Playball", cursive;
    font-size: 38px;
    color: white;
  }

  img {
    border: 2px solid #ffffff;
    margin-right: 5%;
    width: 55px;
    height: 55px;
    border-radius: 98.5px;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 70px;
  bottom: 0;
  background: #126ba5;
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;

  h1 {
    color: #ffffff;
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    cursor: pointer;
  }
`;
