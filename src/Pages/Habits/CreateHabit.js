import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";
import Day from "./Days";
import { ThreeDots } from "react-loader-spinner";

export default function CreateHabit({ Letters, createHabit, setCreateHabit }) {
  const [clickedDay, setClickedDay] = useState([]);
  const [created, setCreated] = useState(false);
  const [habitName, setHabitName] = useState("");

  function handleRegister(e) {
    setHabitName({
      ...habitName,
      [e.target.name]: e.target.value,
    });
  }

  function submitHabit(e) {
    setCreated(true);
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

      .then((res) => {
        setCreateHabit(false);
        console.log(res.data);
        console.log("Seu habito foi criado!");
      })
      .catch((err) => alert(err.response));
  }

  return (
    <NewHabit>
      <input
        disabled={created ? true : false}
        maxLength={25}
        name="name"
        onChange={handleRegister}
        type="text"
        placeholder="Digite aqui o seu novo hábito!"
      />

      <TopNewHabit>
        {Letters.map((letter, index) => (
          <Day
            created={created}
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
        <button onClick={submitHabit}>
          {created ? (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#f5f5f5"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Salvar"
          )}
        </button>
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
  overflow: hidden;

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
  width: 70%;
  height: 30%;
  display: flex;
  align-items: center;
  margin-left: 30%;

  h2 {
    font-family: "Lexend Deca", sans-serif;
    font-size: 16px;
    color: #52b6ff;
  }

  button {
    width: 50%;
    height: 80%;
    background-color: #52b6ff;
    border-radius: 4px;
    border: none;
    color: white;
    font-size: 18px;
    font-family: "Lexend Deca", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
