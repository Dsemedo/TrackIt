import React from "react";
import styled from "styled-components";
import { BASE_URL } from "../../constants/urls";
import Check from "../../Services/img/Check.png";
import colors from "../../constants/colors";
import axios from "axios";

export default function TodayList({
  setHabitDone,
  habitDone,
  todayHabits,
  setTodayHabits,
}) {
  const { Cinza, Verde } = colors;

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  function CheckHabit(id, done) {
    let listDone = habitDone;

    if (listDone.includes(id) || done) {
      listDone = listDone.filter((idAvaliado) => idAvaliado !== id);
      setHabitDone(listDone);
    } else {
      setHabitDone([...habitDone, id]);
    }

    if (habitDone.includes(id) || done) {
      axios
        .post(`${BASE_URL}/habits/${id}/uncheck`, { habitDone }, config)
        .then(console.log("Desmarcado!"));
    } else {
      axios
        .post(`${BASE_URL}/habits/${id}/check`, { habitDone }, config)
        .then(
          console.log("Deu tudo certo, marcado!"),
          setHabitDone([...habitDone, id])
        );
    }
  }

  return todayHabits.map((habit) => (
    <CurrentsHabits>
      <LeftSide>
        <h1>{habit.name}</h1>
        <div>
          <p>Sequencia atual: {habit.currentSequence} dias</p>
          <p>Seu record: {habit.highestSequence} dias</p>
        </div>
      </LeftSide>

      <RightSide
        backColor={habitDone.includes(habit.id) || habit.done ? Verde : Cinza}
        onClick={() => CheckHabit(habit.id, habit.done)}
      >
        <img alt="Verificar se o hábito foi feito" src={Check} />
      </RightSide>
    </CurrentsHabits>
  ));
}

const CurrentsHabits = styled.div`
  background-color: #ffffff;
  margin-bottom: 5%;
  width: 90%;
  height: 100px;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const LeftSide = styled.div`
  margin-left: 2%;
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-direction: column;

  span {
    color: ${(props) => props.color};
  }

  h1 {
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
    color: #666666;
  }

  p {
    font-family: "Lexend Deca", sans-serif;
    font-size: 13;
    color: #666666;
  }
`;

const RightSide = styled.div`
  margin-left: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backColor};
  color: white;
  height: 75%;
  width: 25%;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`;
