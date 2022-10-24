import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BASE_URL } from "../../constants/urls";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TodayList from "./TodayList";
import colors from "../../constants/colors";

export default function Today() {
  // const { setProgress } = useContext(UserProvider);
  // const { progress } = useContext(UserProvider);
  const { Cinza, Verde } = colors;
  const navigate = useNavigate();
  const [todayHabits, setTodayHabits] = useState([]);
  const [habitDone, setHabitDone] = useState([]);

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
      console.log(res.data);
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
          <h1>{now}</h1>

          {habitDone.length === 0 ? (
            <span corzona={Cinza}>Nenhum hábito concluído ainda</span>
          ) : (
            <span corzona={Verde}>{percentage}% dos hábitos concluídos</span>
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

        <Barra
          onClick={() => navigate("/hoje")}
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
`;

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

  h1 {
    margin: 5% 0 2% 0;
    font-family: "Lexend Deca", sans-serif;
    font-size: 23px;
    color: #126ba5;
    left: 0;
  }

  span {
    margin: 0 10px 0 25px;
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    color: ${(props) => props.corzona};
    margin: 0 0 5% 0;
  }
`;

const Footer = styled.div`
  background-color: #126ba5;
  width: 100%;
  height: 10%;
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
