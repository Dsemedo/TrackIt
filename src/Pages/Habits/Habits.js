import styled from "styled-components";
import LogoTrack from "../../Services/img/LogoTrackIt.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/urls";
import { useEffect, useState } from "react";
import axios from "axios";
import HabitCreated from "./HabitCreated";
import colors from "../../constants/colors";

export default function Habits() {
  const { AzulClaro, AzulEscuro, Cinza, Verde, Branco } = colors;

  const [habitos, setHabitos] = useState([]);
  const [createHabit, setCreateHabit] = useState(false);

  const Letters = ["D", "S", "T", "Q", "Q", "S", "S"];

  console.log(habitos);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(`${BASE_URL}/habits`, config)

      .then((res) => {
        setHabitos(res.data);

        console.log(res.data);
      })

      .catch((erro) => {
        console.log(erro.res.data);
      });
  }, []);

  function ViewHabits() {
    return habitos.length === 0 ? (
      <h2>
        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
        começar a trackear!
      </h2>
    ) : (
      <HabitCreated habitos={habitos} Letters={Letters} />
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
        <ViewHabits />

        {createHabit ? (
          <HabitoNovo>
            <input />
            <TopNewHabit>
              {Letters.map((letter, i) => (
                <Day key={i}>
                  <h1>{letter}</h1>
                </Day>
              ))}
            </TopNewHabit>

            <BottomNewHabit>
              <h2>Cancelar</h2>
              <button>Salvar</button>
            </BottomNewHabit>
          </HabitoNovo>
        ) : (
          ""
        )}
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

const Footer = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 10%;
  border: 2px solid blue;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Content = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin: 0 10px 0 10px;
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    color: #666666;
  }
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

    &:hover {
      cursor: pointer;
    }
  }
`;

const HabitoNovo = styled.div`
  margin-top: 5%;
  width: 90%;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 3px;

  h1 {
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
    color: #666666;
  }

  input {
    width: 90%;
    height: 45px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    margin-left: 5%;
    flex-wrap: wrap;
  }
`;

const Day = styled.button`
  background-color: ${(props) => props.backColor};
  width: 25px;
  height: 25px;
  margin-right: 5px;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: ${(props) => props.colorText};
  }
`;

const TopNewHabit = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: row;
  margin: 4% 0 6% 5%;
`;

const BottomNewHabit = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40%;

  button {
    width: 84px;
    height: 35px;
    background-color: #52b6ff;
    border-radius: 4px;
    border: none;
  }
`;
