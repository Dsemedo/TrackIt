import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";
import Day from "./Days";

export default function CreateHabit({ Letters, createHabit, setCreateHabit }) {
  const [clickedDay, setClickedDay] = useState([]);

  const [habitName, setHabitName] = useState("");

  function handleRegister(e) {
    setHabitName({
      ...habitName,
      [e.target.name]: e.target.value,
    });

    console.log(habitName.name);
    console.log(clickedDay);
  }

  function submitHabit(e) {
    e.preventDefault();

    axios
      .post(
        `${BASE_URL}/habits`,
        { name: habitName.name, days: clickedDay },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      .then(alert("Deu tudo certo!"))
      .catch(alert("hoje não"));
  }

  return (
    <NewHabit>
      <input
        name="name"
        onChange={handleRegister}
        type="text"
        placeholder="Digite aqui o seu novo hábito!"
      />
      <TopNewHabit>
        {Letters.map((letter, index) => (
          <Day
            key={index}
            letter={letter}
            index={index}
            clickedDay={clickedDay}
            setClickedDay={setClickedDay}
            habitName={habitName}
            setHabitName={setHabitName}
          />
        ))}
      </TopNewHabit>

      <BottomNewHabit>
        <h2>Cancelar</h2>
        <button onClick={submitHabit}>Salvar</button>
      </BottomNewHabit>
    </NewHabit>
  );
}

const NewHabit = styled.div`
  margin-bottom: 5%;
  width: 90%;
  height: 170px;
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
    margin-top: 1%;
    flex-wrap: wrap;
  }
`;

const TopNewHabit = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: row;
  margin: 3% 0 2% 5%;
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
    color: white;
    font-size: 18px;
    font-family: "Lexend Deca", sans-serif;
  }
`;
