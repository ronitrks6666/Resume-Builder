import { createContext, useContext, useState } from "react";

export const StateContext = createContext("");

const StateProvider = ({ children }) => {
  const [projectDescription, setprojectDescription] = useState(null)

  return (
    <StateContext.Provider
      value={{
        projectDescription,
        setprojectDescription
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(StateContext);
};

export default StateProvider;
