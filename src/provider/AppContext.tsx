import { useContext } from "react";
import { AppContext } from "./AppProvider"; // Adjust the path as necessary

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
