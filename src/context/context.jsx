import { createContext, useState } from "react";

export const Global_var = createContext();

export const Global_var_provider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <Global_var.Provider value={{ count, setCount }}>
      {children}
    </Global_var.Provider>
  );
};
