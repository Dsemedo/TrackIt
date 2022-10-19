import styled from "styled-components";
import LogoTrack from "../../Services/img/LogoTrackIt.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/urls";
import { useState } from "react";
import axios from "axios";

export default function Habits() {
  const [habitos, setHabitos] = useState([]);

  return (
    <Container>
      <Header>
        <h1>TrackIt</h1>
        <img alt="foto de perfil" src={localStorage.getItem("image")} />
      </Header>
      <Content>
        <TopContent>
          <h1>Meus Hábitos</h1>
          <button>+</button>
        </TopContent>
      </Content>

      <Footer>
        <h1>a</h1>

        <h1>a</h1>

        <h1>a</h1>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: gray;
  /* #e5e5e5 */
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

const Footer = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 15%;
  border: 2px solid blue;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Content = styled.div`
  background-color: red;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonAdd = styled.button`
  background-color: #52b6ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  width: 30px;
  height: 30px;
  border-radius: 4.6px;
  border: none;
`;

const TopContent = styled.div`
  height: 10%;
  width: 100%;
  background-color: yellow;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  h1 {
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
    color: #126ba5;
  }

  button {
    margin-left: 30%;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: none;
    background-color: #52b6ff;
    color: #f5f5f5f5;
  }
`;
