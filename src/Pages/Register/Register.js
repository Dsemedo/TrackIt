import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoTrack from "../../Services/img/LogoTrackIt.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/urls";
import { ThreeDots } from "react-loader-spinner";

export default function Register() {
  const navigate = useNavigate();
  const [submited, setSubmited] = useState(false);

  const [forms, setForms] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });

  function handleRegister(e) {
    setForms({
      ...forms,
      [e.target.name]: e.target.value,
    });
  }

  function submitUser(e) {
    setSubmited(true);
    e.preventDefault();

    const promise = axios.post(`${BASE_URL}/auth/sign-up`, forms);

    promise.then(() => navigate("/"));
    promise.catch((err) => {
      console.log(err.response);
      alert("Preencha corretamente");
      setSubmited(false);
    });
  }

  return (
    <>
      <Form>
        <Logo alt="LogoTrackIt" src={LogoTrack} />
        <input
          disabled={submited ? true : false}
          name="email"
          onChange={handleRegister}
          type="email"
          placeholder="email"
          value={forms.email}
          required
        />
        <input
          disabled={submited ? true : false}
          name="password"
          onChange={handleRegister}
          type="password"
          placeholder="senha"
          value={forms.password}
          required
        />
        <input
          disabled={submited ? true : false}
          name="name"
          onChange={handleRegister}
          type="text"
          placeholder="nome"
          value={forms.name}
          required
        />
        <input
          disabled={submited ? true : false}
          name="image"
          onChange={handleRegister}
          type="url"
          placeholder="foto"
          value={forms.image}
          required
        />
        <ButtLogin
          type="submit"
          onClick={submitUser}
          disabled={submited ? true : false}
        >
          {submited ? (
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
            "Cadastrar"
          )}
        </ButtLogin>

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
