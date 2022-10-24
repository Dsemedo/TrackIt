import styled from "styled-components";
import { BASE_URL } from "../../constants/urls";
import { useEffect, useState } from "react";
import axios from "axios";
import HabitCreated from "./HabitCreated";
import { useNavigate } from "react-router-dom";
import CreateHabit from "./CreateHabit";
import Loading from "../../Services/img/loading.gif";

export default function Habits({
  habitDone,
  setHabitDone,
  setTodayHabits,
  todayHabits,
}) {
  const navigate = useNavigate();

  const [habitos, setHabitos] = useState([]);
  const [createHabit, setCreateHabit] = useState(false);
  const Letters = ["D", "S", "T", "Q", "Q", "S", "S"];

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const promise = axios.get(`${BASE_URL}/habits`, config);

    promise.then((res) => {
      setHabitos(res.data);
    });
  }, [createHabit]);

  function ViewHabits() {
    return habitos.length === 0 ? (
      <h2>
        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
        começar a trackear!
      </h2>
    ) : (
      <HabitCreated
        habitos={habitos}
        setHabitos={setHabitos}
        Letters={Letters}
        setCreateHabit={setCreateHabit}
        createHabit={createHabit}
      />
    );
  }

  return (
    <Container>
      <Header>
        <h1>TrackIt</h1>
        <img alt="foto de perfil" src={localStorage.getItem("image")} />
      </Header>

      <Content>
        <TopContent>
          <h1>Meus Hábitos</h1>
          <button onClick={() => setCreateHabit(!createHabit)}>+</button>
        </TopContent>

        {createHabit ? <CreateHabit Letters={Letters} /> : ""}

        <ViewHabits />
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
  background-color: #e5e5e5;
`;

const Header = styled.div`
  /* top: 0;
  width: 100%;
  height: 80px;
  background-color: #126ba5;
  display: flex;
  align-items: center; */

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
    margin-left: 50%;
    width: 55px;
    height: 55px;
    border-radius: 98.5px;
  }
`;

const Footer = styled.footer`
  /* background-color: #126ba5;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center; */

  width: 100%;
  height: 70px;
  bottom: 0;
  background: #126ba5;
  z-index: 1;
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

const Content = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll; */
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  margin-top: 70px;
  overflow-y: scroll;

  h2 {
    margin: 0 10px 0 25px;
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    color: #666666;
  }
`;

const TopContent = styled.div`
  top: 0;
  height: 80px;
  width: 100%;
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
    cursor: pointer;
  }
`;
