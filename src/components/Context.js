import React, { createContext, useState } from "react";

export const AppContext = createContext();
const { Provider } = AppContext;

export const AppProvider = (props) => {
  const [users, setUsers] = useState({
       employee : [] , 
       admin: [] 
  });
  return <Provider value={[users, setUsers]}>{props.children}</Provider>;
};
