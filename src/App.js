import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Habits from "./Pages/Habits/Habits";
import GlobalStyle from "./Services/GlobalStyle";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserProvider from "./context/User";
import Today from "./Pages/Today/Today";
import Historic from "./Pages/Historic/Historic";
import { useState } from "react";

function App() {
  const [todayHabits, setTodayHabits] = useState([]);
  const [habitDone, setHabitDone] = useState([]);
  const percentage = ((habitDone.length / todayHabits.length) * 100).toFixed(2);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/habitos" element={<Habits percentage={percentage} />} />
          <Route
            path="/hoje"
            element={
              <Today
                percentage={percentage}
                habitDone={habitDone}
                setHabitDone={setHabitDone}
                setTodayHabits={setTodayHabits}
                todayHabits={todayHabits}
              />
            }
          />
          <Route
            path="/historico"
            element={<Historic percentage={percentage} />}
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
