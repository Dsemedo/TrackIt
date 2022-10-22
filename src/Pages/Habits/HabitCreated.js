import React from "react";
import styled from "styled-components";
import Trash from "../../Services/img/TrashIcon.png";
import colors from "../../constants/colors";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";

export default function HabitCreated({ setHabitos, habitos, Letters }) {
  const { Cinza, Branco } = colors;

  function deleteHabit(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const requisicao = axios.delete(`${BASE_URL}/habits/${id}`, config);

    requisicao.then(() => {
      setHabitos(habitos.filter((habito) => habito.id !== id));
      alert("Hábito apagado!");
    });
  }

  return habitos.map((habito) => (
    <Habit key={habito.id}>
      <TopHabit>
        <h1>{habito.name}</h1>
        <img
          alt="Icone para deletar habito"
          src={Trash}
          onClick={() => deleteHabit(habito.id)}
        />
      </TopHabit>

      <BottomHabit>
        {Letters.map((letter, i) => (
          <Day
            key={i}
            backColor={habito.days.includes(i) ? Cinza : Branco}
            colorText={habito.days.includes(i) ? Branco : Cinza}
          >
            <h1>{letter}</h1>
          </Day>
        ))}
      </BottomHabit>
    </Habit>
  ));
}

const HabitoNovo = styled.div`
  margin-bottom: 5%;
  width: 90%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 3px;

  h1 {
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
    color: #666666;
  }
`;

const Habit = styled.div`
  margin-bottom: 5%;
  width: 90%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 3px;

  h1 {
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
    color: #666666;
  }
`;

const TopHabit = styled.div`
  width: 90%;
  height: 50%;
  display: flex;
  justify-content: space-between;

  img {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`;

const BottomHabit = styled.div`
  width: 90%;
  display: flex;
`;

const Day = styled.button`
  background-color: ${(props) => props.backColor};
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border: 1px solid #cfcfcf;
  border-radius: 4px;

  h1 {
    color: ${(props) => props.colorText};
  }
`;
