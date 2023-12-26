import React, {ReactNode, useEffect} from "react";
import {info} from "@/api/user/info";
import {refresh} from "@/api/user/refresh";
import AuthContext from "@/context/AuthContext";
import {useRouter} from "next/navigation";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = React.useState(false);
  const [token, setToken] = React.useState('');

  useEffect(() => {
    console.log('login 검증 시작');
    const fetchData = async () => {
      try {
        const response = await info({token: 'x'});
        setIsLogin(true);

      } catch (error) {
        try {
          const response2 = await refresh({refresh: 'x'});
          const response3 = await info({token: 'x'});
          console.log('login 상태2');
          setIsLogin(true);
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
        setIsLogin,
        token,
        setToken,
      }}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;