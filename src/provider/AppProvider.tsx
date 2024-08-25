import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define the shape of your context state
interface AppState {
  product: string;
  value: number;
}

// Define actions
type Action =
  | { type: "SET_PRODUCT"; payload: string }
  | { type: "SET_VALUE"; payload: number };

// Define the initial state
const initialState: AppState = {
  product: "",
  value: 0,
};

// Create the context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Create a reducer function
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_PRODUCT":
      return { ...state, product: action.payload };
    case "SET_VALUE":
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

// Create a provider component
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
