import React from "react";

interface AuthContextType {
  isLogin: boolean;
  token: string;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = React.createContext({
  isLogin: false,
  token: '',
  setIsLogin: () => {},
  setToken: () => {},
} as AuthContextType);

export default AuthContext;