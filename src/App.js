import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Habits from "./Pages/Habits/Habits";
import GlobalStyle from "./Services/GlobalStyle";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserProvider from "./context/User";
import Today from "./Pages/Today/Today";
import Historic from "./Pages/Historic/Historic";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/habitos" element={<Habits />} />
          <Route path="/hoje" element={<Today />} />
          <Route path="/historico" element={<Historic />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
