import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoTrack from "../../Services/img/LogoTrackIt.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/urls";

export default function Register() {
  const navigate = useNavigate();

  const [forms, setForms] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });

  function handleForm(e) {
    setForms({
      ...forms,
      [e.target.name]: e.target.value,
    });
  }

  function submitUser(e) {
    e.preventDefault();
    const promise = axios.post(`${BASE_URL}/auth/sign-up`, forms);

    promise.then(() => navigate("/"));
    promise.catch(alert("hoje não"));
  }

  return (
    <>
      <Form onSubmit={submitUser}>
        <Logo alt="LogoTrackIt" src={LogoTrack} />
        <input
          onChange={handleForm}
          type="email"
          placeholder="email"
          value={forms.email}
        />
        <input
          onChange={handleForm}
          type="password"
          placeholder="senha"
          value={forms.password}
        />
        <input
          onChange={handleForm}
          type="text"
          placeholder="nome"
          value={forms.name}
        />
        <input
          onChange={handleForm}
          type="url"
          placeholder="foto"
          value={forms.image}
        />
        <ButtLogin type="submit">Cadastrar</ButtLogin>

        <StyledLink to="/">Já tem uma conta? Faça login! </StyledLink>
      </Form>
    </>
  );
}

const Logo = styled.img`
  margin-top: 10%;
  width: 250px;
  height: 250px;
  object-fit: cover;
`;

const Form = styled.form`
  height: 100%;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 80%;
    height: 45px;
    margin-bottom: 3%;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-size: 20px;
  }
`;

const ButtLogin = styled.button`
  margin-top: 5%;
  width: 82%;
  height: 45px;
  color: white;
  background-color: #52b6ff;
  border-radius: 4px;
  border: none;
  font-size: 20px;
  font-family: "Lexend Deca", sans-serif;
`;

const StyledLink = styled(Link)`
  margin-top: 5%;
  color: #52b6ff;
  font-size: 14px;
  font-family: "Lexend Deca", sans-serif;
`;
