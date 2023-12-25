import React from "react";

interface AuthContextType {
  isLogin: boolean;
  nickname: string;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = React.createContext({
  isLogin: false,
  nickname: '',
  setIsLogin: () => {},
  setNickname: () => {}
} as AuthContextType);

export default AuthContext;