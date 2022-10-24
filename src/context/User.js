import { createContext, useState } from "react";

const UserContext = createContext({});

function UserProvider({ children }) {
  const [progress, setProgress] = useState(0);

  return (
    <UserContext.Provider value={{ progress, setProgress }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
