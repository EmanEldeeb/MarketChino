import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  console.log(isLogged);

  return (
    <UserContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("useUser must be used within a UserContextProvider");
  return context;
}
