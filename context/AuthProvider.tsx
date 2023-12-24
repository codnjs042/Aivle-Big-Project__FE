import React, {ReactNode, useEffect} from "react";
import Cookies from "js-cookie";
import {access} from "@/api/token/access";
import {refresh} from "@/api/token/refresh";
import AuthContext from "@/context/AuthContext";
import {useRouter} from "next/navigation";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = React.useState(false);
  const [nickname, setNickname] = React.useState('');

  useEffect(() => {
    console.log('login 검증 시작');
    const fetchData = async () => {
      const access_token = Cookies.get('access_token');
      console.log("access_token :" + access_token);
      try {
        if (access_token) {
          const response = await access({token: access_token});
          console.log(response);
          console.log('login 상태1');
          setIsLogin(true);
          setNickname(response.nickname);
        }
      } catch (error) {
        const refresh_token = Cookies.get('refresh_token');
        try {
          if (refresh_token) {
            const response = await refresh({refresh: refresh_token});
            Cookies.set('access_token', response.access);
            const access_token = Cookies.get('access_token');
            if (access_token) {
              const response = await access({token: access_token});
              console.log('login 상태2');
              setIsLogin(true);
              setNickname(response.nickname);
            }
          }
        } catch (error) {
          console.log('login 실패');
        }
      }
    };
    fetchData();
  }, []);

  return (
      <AuthContext.Provider value={{isLogin, nickname, setIsLogin, setNickname}}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;