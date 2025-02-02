import { useContext } from "react";
import {Global_var} from "./context"

export const useGlobalVar = () => {
  const context = useContext(Global_var);

  return context;
};