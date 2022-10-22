import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Today() {
  const navigate = useNavigate();
  console.log(dayjs());

  function TodayHabits() {}

  return (
    <Container>
      <Header>
        <h1>TrackIt</h1>
        <img alt="foto de perfil" src={localStorage.getItem("image")} />
      </Header>
      <Content>
        <h2>
          {dayjs().year()} {dayjs().day()}
        </h2>
        <h3>Nenhum hábito concluído ainda</h3>

        <TodayHabits />
      </Content>
      <Footer>
        <h1 onClick={() => navigate("/habitos")}>Hábitos</h1>
        <h1 onClick={() => navigate("/hoje")}>Hoje</h1>
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

  h2 {
    margin: 0 10px 0 25px;
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    color: #666666;
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
