import React, {ReactNode, useEffect} from "react";
import Cookies from "js-cookie";
import {verify} from "@/api/user/verify";
import {refresh} from "@/api/user/refresh";
import AuthContext from "@/context/AuthContext";
import {useRouter} from "next/navigation";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = React.useState(false);
  const [nickname, setNickname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [genrePrefers, setGenrePrefers] = React.useState(BigInt(0));
  const [artistPrefers, setArtistPrefers] = React.useState(BigInt(0));

  useEffect(() => {
    console.log('login 검증 시작');
    const fetchData = async () => {
      try {
        const response = await verify({token: 'x'});
        console.log(response);
        console.log('login 상태1');
        setIsLogin(true);
        setNickname(response.nickname);
        setEmail(response.email);
        setGenrePrefers(response.genrePrefers);
        setArtistPrefers(response.artistPrefers);
      } catch (error) {
        try {
          const response2 = await refresh({refresh: 'x'});
          const response3 = await verify({token: 'x'});
          console.log('login 상태2');
          setIsLogin(true);
          setNickname(response3.nickname);
          setEmail(response3.email);
          setGenrePrefers(response3.genrePrefers);
          setArtistPrefers(response3.artistPrefers);
        } catch (error) {
          console.log('login 실패');
        }
      }
    };
    fetchData();
  }, []);

  return (
      <AuthContext.Provider value={{
        isLogin,
        nickname,
        email,
        genrePrefers,
        artistPrefers,
        setIsLogin,
        setNickname,
        setEmail,
        setGenrePrefers,
        setArtistPrefers
      }}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;