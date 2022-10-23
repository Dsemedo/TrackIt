import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Habits from "./Pages/Habits/Habits";
import GlobalStyle from "./Services/GlobalStyle";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext";
import { useState } from "react";
import Today from "./Pages/Today/Today";

function App() {
  const [todayHabits, setTodayHabits] = useState([]);

  return (
    <UserContext.Provider value={(todayHabits, setTodayHabits)}>
      <BrowserRouter>
        <GlobalStyle />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/habitos" element={<Habits />} />
          <Route path="/hoje" element={<Today />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
