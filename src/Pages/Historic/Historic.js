import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Historic({
  habitDone,
  setHabitDone,
  setTodayHabits,
  todayHabits,
}) {
  const navigate = useNavigate();
  return (
    <Container>
      <Header>
        <h1>TrackIt</h1>
        <img alt="foto de perfil" src={localStorage.getItem("image")} />
      </Header>
      <Content>
        <InfoDay>
          <h1>Histórico</h1>
          <span>
            Em breve você poderá ver o histórico dos seus hábitos aqui!
          </span>
        </InfoDay>
      </Content>

      <Footer>
        <h1 onClick={() => navigate("/habitos")}>Hábitos</h1>
        <Barra
          value={0}
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
    color: #666666;
    margin: 5% 0 5% 0;
  }
`;

const Footer = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 10%;

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

const Barra = styled(CircularProgressbar)`
  width: 120px;
  height: 110px;
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  z-index: 1;
`;
