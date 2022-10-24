import styled from "styled-components";
import LogoTrack from "../../Services/img/LogoTrackIt.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { BASE_URL } from "../../constants/urls";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);

  const [log, setLog] = useState({
    email: "",
    password: "",
  });

  function handleLogin(e) {
    setLog({
      ...log,
      [e.target.name]: e.target.value,
    });
  }

  function enterUser(e) {
    setLogged(true);
    e.preventDefault();

    axios
      .post(`${BASE_URL}/auth/login`, log)

      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("image", response.data.image);
        navigate("/hoje");
      })
      .catch(() => {
        alert("Email e/ou senha inválidos");
        setLogged(false);
      });
  }

  return (
    <>
      <Form>
        <Logo alt="LogoTrackIt" src={LogoTrack} />

        <input
          disabled={logged ? true : false}
          name="email"
          onChange={handleLogin}
          type="email"
          placeholder="email"
          value={log.email}
        />
        <input
          disabled={logged ? true : false}
          name="password"
          onChange={handleLogin}
          type="password"
          placeholder="senha"
          value={log.password}
        />
        <ButtLogin
          type="submit"
          onClick={enterUser}
          disabled={logged ? true : false}
        >
          {logged ? (
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
            "Entrar"
          )}
        </ButtLogin>
        <StyledLink to="/cadastro">Não tem uma conta? Cadastre-se!</StyledLink>
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
    margin-bottom: 5%;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-size: 20px;
  }
`;

const ButtLogin = styled.button`
  width: 82%;
  height: 45px;
  color: white;
  background-color: #52b6ff;
  border-radius: 4px;
  border: none;
  font-size: 20px;
  font-family: "Lexend Deca", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin-top: 5%;
  color: #52b6ff;
  font-size: 14px;
  font-family: "Lexend Deca", sans-serif;
`;
