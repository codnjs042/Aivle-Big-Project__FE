import React from "react";

interface AuthContextType {
  isLogin: boolean;
  nickname: string;
  email: string;
  genrePrefers: bigint;
  artistPrefers: bigint;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setGenrePrefers: React.Dispatch<React.SetStateAction<bigint>>;
  setArtistPrefers: React.Dispatch<React.SetStateAction<bigint>>;
}

const AuthContext = React.createContext({
  isLogin: false,
  nickname: '',
  email: '',
  genrePrefers: BigInt(0),
  artistPrefers: BigInt(0),
  setIsLogin: () => {},
  setNickname: () => {},
  setEmail: () => {},
  setGenrePrefers: () => {},
  setArtistPrefers: () => {}
} as AuthContextType);

export default AuthContext;