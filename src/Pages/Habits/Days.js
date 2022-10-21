import React from "react";
import { useState } from "react";
import styled from "styled-components";
import colors from "../../constants/colors";

export default function Days({
  setClickedDay,
  clickedDay,
  setHabitName,
  habitName,
  letter,
  index,
}) {
  const { AzulClaro, AzulEscuro, Cinza, Branco } = colors;

  const [colorido, setColorido] = useState(false);

  function changeColor(index) {
    let listAux = clickedDay;

    setColorido(!colorido);

    let newColorido = !colorido;

    if (newColorido === true) {
      setClickedDay([...clickedDay, index]);
    } else {
      listAux = listAux.filter((diaAvaliado) => diaAvaliado !== index);
      setClickedDay(listAux);
    }
  }

  return (
    <Day
      key={index}
      onClick={() => changeColor(index)}
      backColor={clickedDay.includes(index) ? Cinza : Branco}
    >
      <h1>{letter}</h1>
    </Day>
  );
}

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
