import React from "react";

interface AuthContextType {
  token: string;

  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = React.createContext({
  token: '',
  setToken: () => {},
} as AuthContextType);

export default AuthContext;