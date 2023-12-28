import React from "react";

export interface User {
  email: string;
  nickname: string;
  selectedGenres: number;
  selectedArtist: number;
}

export interface AuthContextType {
  login: boolean;
  access: string;
  user: User | null;
  setLogin: (login: boolean) => void;
  setAccess: (access: string) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = React.createContext({
  login: true,
  access: '',
  user: null,
  setLogin: (login: boolean) => {},
  setAccess: (access: string) => {},
  setUser: (user: User | null) => {},
} as AuthContextType);

export default AuthContext;