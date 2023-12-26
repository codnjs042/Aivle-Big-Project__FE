import React, {ReactNode, useState} from "react";
import AuthContext from "@/context/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const [token, setToken] = useState('');

  return (
      <AuthContext.Provider value={{token, setToken}}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;